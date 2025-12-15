const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files
app.use(express.static(path.join(__dirname, 'front_end')));

// Load employee data
let rawdata = fs.readFileSync(path.join(__dirname, 'db.json'));
let employee = JSON.parse(rawdata);

// API routes
app.get('/api', (req, res) => {
    res.json({ employees: employee.data });
});

app.get('/api/by_name/:qname', (req, res) => {
    let query = req.params.qname;
    let filtered = employee.data.filter(e => e.employee_name.includes(query));
    res.json({ employees: filtered });
});

app.get('/api/by_age/:start/:end', (req, res) => {
    let start = parseInt(req.params.start);
    let end = parseInt(req.params.end);
    let filtered = employee.data.filter(e => e.employee_age > start && e.employee_age < end);
    res.json({ employees: filtered });
});

// Catch-all for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'index_dev.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
