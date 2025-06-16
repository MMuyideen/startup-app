const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints for dynamic content
app.get('/api/stats', (req, res) => {
    res.json({
        visitors: Math.floor(Math.random() * 10000) + 5000,
        companies: Math.floor(Math.random() * 200) + 150,
        savings: '40%',
        uptime: '99.9%'
    });
});

app.get('/api/demo-request', (req, res) => {
    const demoId = 'DEMO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    res.json({
        success: true,
        demoId: demoId,
        message: 'Demo scheduled successfully!',
        nextSteps: 'Our team will contact you within 24 hours.'
    });
});

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Startup app running on port ${PORT}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
