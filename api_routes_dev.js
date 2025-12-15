const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Read db.json
const rawdata = fs.readFileSync(path.join(__dirname, 'db.json'));
const employee = JSON.parse(rawdata);

// Get all employees
router.get('/', (req, res) => {
    res.json({ employees: employee["data"] });
});

// Search by name
router.get('/by_name/:qname', (req, res) => {
    const query = req.params.qname;
    const filtered_employees = employee["data"].filter(q => q.employee_name.includes(query));
    res.json({ employees: filtered_employees });
});

// Search by age range
router.get('/by_age/:start_age/:end_age', (req, res) => {
    const start_age = parseInt(req.params.start_age);
    const end_age = parseInt(req.params.end_age);
    const filtered_employees = employee["data"].filter(q => q.employee_age > start_age && q.employee_age < end_age);
    res.json({ employees: filtered_employees });
});

module.exports = router;

