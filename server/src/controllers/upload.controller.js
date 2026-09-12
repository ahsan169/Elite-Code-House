exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    res.status(200).json({
      success: true,
      url: `/uploads/images/${req.file.filename}`
    });
  } catch (error) {
    next(error);
  }
};
