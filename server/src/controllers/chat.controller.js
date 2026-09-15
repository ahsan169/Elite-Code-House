const Chat = require('../models/Chat');
const { generateChatResponse } = require('../services/gemini.service');
const crypto = require('crypto');

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    let chat;

    if (conversationId) {
      chat = await Chat.findOne({ conversationId });
      if (!chat) {
        return res.status(404).json({ success: false, message: 'Conversation not found' });
      }
      if (chat.status === 'closed') {
        return res.status(400).json({ success: false, message: 'This conversation has been closed' });
      }
    } else {
      const newConversationId = crypto.randomUUID();
      chat = await Chat.create({
        conversationId: newConversationId,
        messages: [],
        visitorInfo: { captured: false }
      });
    }

    chat.messages.push({ role: 'user', content: message.trim() });

    const aiResponse = await generateChatResponse(chat.messages);

    chat.messages.push({ role: 'assistant', content: aiResponse });

    const lowerMsg = message.toLowerCase();
    if (!chat.visitorInfo.captured) {
      const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        chat.visitorInfo.email = emailMatch[0];
      }
      if (lowerMsg.includes('my name is') || lowerMsg.includes("i'm ") || lowerMsg.includes('i am ')) {
        const namePatterns = [
          /my name is\s+(.+)/i,
          /i'm\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i,
          /i am\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/i
        ];
        for (const pattern of namePatterns) {
          const match = message.match(pattern);
          if (match) {
            chat.visitorInfo.name = match[1].trim().split(/\s+/).slice(0, 3).join(' ');
            break;
          }
        }
      }
      const phoneMatch = message.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/);
      if (phoneMatch) {
        chat.visitorInfo.phone = phoneMatch[0];
      }
      if (chat.visitorInfo.name || chat.visitorInfo.email) {
        chat.visitorInfo.captured = true;
      }
    }

    await chat.save();

    res.status(200).json({
      success: true,
      conversationId: chat.conversationId,
      message: aiResponse,
      visitorInfo: chat.visitorInfo
    });
  } catch (error) {
    console.error('Chat error:', error.message);
    
    if (error.message.includes('GROQ_API_KEY')) {
      return res.status(503).json({ 
        success: false, 
        message: 'AI service is not configured. Please contact us via WhatsApp.' 
      });
    }
    
    if (error.message.includes('API key') || error.message.includes('Invalid')) {
      return res.status(503).json({ 
        success: false, 
        message: 'AI service is temporarily unavailable. Please try again later or contact us via WhatsApp.' 
      });
    }
    
    if (error.status === 429 || error.message.includes('rate')) {
      return res.status(429).json({ 
        success: false, 
        message: 'Too many requests. Please wait a moment and try again.' 
      });
    }
    
    next(error);
  }
};

exports.getConversation = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ conversationId: req.params.conversationId });
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

exports.getAllChats = async (req, res, next) => {
  try {
    const chats = await Chat.find()
      .select('-messages')
      .sort({ updatedAt: -1 });
    res.status(200).json({ success: true, count: chats.length, chats });
  } catch (error) {
    next(error);
  }
};

exports.getChatDetails = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({ conversationId: req.params.conversationId });
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

exports.closeChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOneAndUpdate(
      { conversationId: req.params.conversationId },
      { status: 'closed' },
      { returnDocument: 'after' }
    );
    if (!chat) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }
    res.status(200).json({ success: true, chat });
  } catch (error) {
    next(error);
  }
};

exports.getChatStats = async (req, res, next) => {
  try {
    const total = await Chat.countDocuments();
    const active = await Chat.countDocuments({ status: 'active' });
    const closed = await Chat.countDocuments({ status: 'closed' });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Chat.countDocuments({ createdAt: { $gte: today } });

    res.status(200).json({
      success: true,
      stats: { total, active, closed, todayCount }
    });
  } catch (error) {
    next(error);
  }
};
