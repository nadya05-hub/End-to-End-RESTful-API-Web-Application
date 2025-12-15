const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'front_end')));

// Read employee data from db.json
let rawdata = fs.readFileSync(path.join(__dirname, 'db.json'));
let employee = JSON.parse(rawdata);

// API routes
app.get('/api', (req, res) => {
    res.json({ employees: employee["data"] });
});

app.get('/api/by_name/:qname', (req, res) => {
    let query = req.params['qname'];
    let filtered_employees = employee["data"].filter(q => q.employee_name.includes(query));
    res.json({ employees: filtered_employees });
});

app.get('/api/by_age/:start_age/:end_age', (req, res) => {
    let start_age = parseInt(req.params['start_age']);
    let end_age = parseInt(req.params['end_age']);
    let filtered_employees = employee["data"].filter(q => q.employee_age > start_age && q.employee_age < end_age);
    res.json({ employees: filtered_employees });
});

// Catch-all to serve index_dev.html for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'index_dev.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
