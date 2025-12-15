const employeeTableBody = document.getElementById('employeeTableBody');
const searchNameInput = document.getElementById('searchName');
const startAgeInput = document.getElementById('startAge');
const endAgeInput = document.getElementById('endAge');
const searchAgeBtn = document.getElementById('searchAgeBtn');

// Helper to render employees in the table
function renderEmployees(employees) {
    employeeTableBody.innerHTML = '';
    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.employee_name}</td>
            <td>${emp.employee_age}</td>
            <td>${emp.employee_salary}</td>
        `;
        employeeTableBody.appendChild(row);
    });
}

// Fetch all employees
function fetchAllEmployees() {
    fetch('/api')
        .then(res => res.json())
        .then(data => renderEmployees(data.employees))
        .catch(err => console.error(err));
}

// Search by name
searchNameInput.addEventListener('input', () => {
    const query = searchNameInput.value.trim();
    if(query === '') {
        fetchAllEmployees();
        return;
    }
    fetch(`/api/by_name/${query}`)
        .then(res => res.json())
        .then(data => renderEmployees(data.employees))
        .catch(err => console.error(err));
});

// Search by age
searchAgeBtn.addEventListener('click', () => {
    const startAge = startAgeInput.value.trim();
    const endAge = endAgeInput.value.trim();
    if(startAge === '' || endAge === '') return;
    fetch(`/api/by_age/${startAge}/${endAge}`)
        .then(res => res.json())
        .then(data => renderEmployees(data.employees))
        .catch(err => console.error(err));
});

// Load all employees on page load
fetchAllEmployees();
