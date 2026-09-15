const DAILY_API_URL = 'https://api.daily.co/v1/rooms';

const activeCalls = new Map();

exports.createRoom = async (req, res, next) => {
  try {
    const { callType } = req.body;

    if (!callType || !['audio', 'video'].includes(callType)) {
      return res.status(400).json({
        success: false,
        message: 'callType must be "audio" or "video"'
      });
    }

    const apiKey = process.env.DAILY_API_KEY;
    if (!apiKey || apiKey === 'your_daily_api_key_here') {
      return res.status(500).json({
        success: false,
        message: 'Daily.co API key is not configured. Please set DAILY_API_KEY in your .env file.'
      });
    }

    const exp = Math.floor(Date.now() / 1000) + 3600;

    const response = await fetch(DAILY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        properties: {
          exp,
          enable_chat: true,
          start_audio_off: false,
          start_video_off: callType === 'audio'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.error || 'Failed to create Daily.co room'
      });
    }

    const callId = data.name;
    activeCalls.set(callId, {
      id: callId,
      url: data.url,
      callType,
      callerName: req.body.callerName || 'Anonymous',
      status: 'waiting',
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      url: data.url,
      callType,
      callId
    });
  } catch (error) {
    next(error);
  }
};

exports.getActiveCalls = async (req, res, next) => {
  try {
    const calls = Array.from(activeCalls.values()).reverse();
    res.status(200).json({ success: true, calls });
  } catch (error) {
    next(error);
  }
};

exports.endCall = async (req, res, next) => {
  try {
    const { callId } = req.params;
    activeCalls.delete(callId);
    res.status(200).json({ success: true, message: 'Call removed' });
  } catch (error) {
    next(error);
  }
};
