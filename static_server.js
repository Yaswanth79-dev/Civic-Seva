const express = require('express');
const path = require('path');
const app = express();

// Serve static files with automatic .html extension support
app.use(express.static(__dirname, { extensions: ['html'] }));

// Fallback to index.html for any other GET requests (SPA behavior if needed)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Static frontend server running on port 8080'));
