const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

exports.submit = async (req, res, next) => {
  try {
    const message = await Message.create(req.body);

    await sendEmail({
      email: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${req.body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        ${req.body.phone ? `<p><strong>Phone:</strong> ${req.body.phone}</p>` : ''}
        ${req.body.company ? `<p><strong>Company:</strong> ${req.body.company}</p>` : ''}
        ${req.body.service ? `<p><strong>Service:</strong> ${req.body.service}</p>` : ''}
        ${req.body.budget ? `<p><strong>Budget:</strong> ${req.body.budget}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
      `
    });

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { returnDocument: 'after' }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
