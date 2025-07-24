const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Path to DB file
const DB_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper: Load data
function loadData() {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({
            invoices: [],
            purchases: [],
            creditNotes: [],
            debitNotes: [],
            customers: [],
            suppliers: [],
            products: [],
            companyDetails: {}
        }, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

// Helper: Save data
function saveData(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// GET all data
app.get('/api/data', (req, res) => {
    const data = loadData();
    res.json(data);
});

// POST (overwrite) all data
app.post('/api/data', (req, res) => {
    saveData(req.body);
    res.json({ status: 'success' });
});

// Health check
app.get('/api/ping', (req, res) => {
    res.send('Server is running ✅');
});

// Start server
app.listen(PORT, () => {
    console.log(🚀 Server running at http://localhost:${PORT});
});