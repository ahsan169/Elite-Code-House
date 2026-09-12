const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/testimonials', require('./routes/testimonial.routes'));
app.use('/api/blog', require('./routes/blog.routes'));
app.use('/api/messages', require('./routes/message.routes'));
app.use('/api/upload', require('./routes/upload.routes'));
app.use('/api/admin', require('./routes/admin.routes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
