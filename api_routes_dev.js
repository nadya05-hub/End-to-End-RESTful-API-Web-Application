const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(path.join(__dirname, 'db.json'));
let employee = JSON.parse(rawdata);

// GET all employees
router.get('/', (req, res) => {
    res.json({
        employees: employee.data
    });
});

// GET by name
router.get('/by_name/:qname', (req, res) => {
    let query = req.params.qname;
    let filtered = employee.data.filter(e =>
        e.employee_name.includes(query)
    );

    res.json({
        employees: filtered
    });
});

// GET by age range
router.get('/by_age/:start_age/:end_age', (req, res) => {
    let start = parseInt(req.params.start_age);
    let end = parseInt(req.params.end_age);

    let filtered = employee.data.filter(e =>
        e.employee_age > start && e.employee_age < end
    );

    res.json({
        employees: filtered
    });
});

module.exports = router;
