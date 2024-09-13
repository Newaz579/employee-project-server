function addEmployee() {
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const birthdate = document.getElementById('birthdate').value;
    const email = document.getElementById('email').value;
    const contactNo = document.getElementById('contactNo').value;
    const emergencyContactNo = document.getElementById('emergencyContactNo').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const presentAddress = document.getElementById('presentAddress').value;
    const permanentAddress = document.getElementById('permanentAddress').value;
    const department = document.getElementById('department').value;

    // Create employee object
    const employee = {
        name,
        age,
        gender,
        birthdate,
        email,
        contactNo,
        emergencyContactNo,
        bloodGroup,
        presentAddress,
        permanentAddress,
        department
    };
    // ems.addEmployee(employee);
    fetch('http://localhost:5000/add-employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    
}



function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function updateEmployee(){

    const id = getQueryParam('id');
    // console.log(id);

    const newData = {};

    const name = document.getElementById("name").value;
    if (name) newData.name = name;

    const age = document.getElementById("age").value;
    if (age) newData.age = parseInt(age);

    const gender = document.getElementById("gender").value;
    if (gender) newData.gender = gender;

    const birthdate = document.getElementById("birthdate").value;
    if (birthdate) newData.birthdate = birthdate;

    const email = document.getElementById("email").value;
    if (email) newData.email = email;

    const contactNo = document.getElementById("contactNo").value;
    if (contactNo) newData.contactNo = contactNo;

    const emergencyContactNo = document.getElementById("emergencyContactNo").value;
    if (emergencyContactNo) newData.emergencyContactNo = emergencyContactNo;

    const bloodGroup = document.getElementById("bloodGroup").value;
    if (bloodGroup) newData.bloodGroup = bloodGroup;

    const presentAddress = document.getElementById("presentAddress").value;
    if (presentAddress) newData.presentAddress = presentAddress;

    const permanentAddress = document.getElementById("permanentAddress").value;
    if (permanentAddress) newData.permanentAddress = permanentAddress;

    const department = document.getElementById("department").value;
    if (department) newData.department = department;

    fetch(`http://localhost:5000/update-employee/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function searchEmployee() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        // Prevent the form from submitting
        event.preventDefault();
        const attribute = document.getElementById('attribute').value;
        const value = document.getElementById('value').value;

        // Send a GET request to the server with the selected attribute and value
        fetch(`http://localhost:5000/search-employees?attribute=${attribute}&value=${value}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => console.error('Error:', error));
    });
}



function deleteEmployee(id) {
    if (window.confirm("Do you really want to Delete?")) {
        fetch(`http://localhost:5000/delete-employee/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data);
            location.reload();
        })
        .catch(error => console.error('Error:', error));
      }

}

function showEmployees() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => console.error('Error:', error));
}

function displaySearchResults(data) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = ''; 

    if (!data || data.length === 0) {
        resultsDiv.innerHTML = '<p>No employees found.</p>';
        return;
    }

    // Create a table element
    const table = document.createElement('table');

    // Create table headers
    const headers = ['ID', 'Name', 'Age', 'Gender', 'Birthdate', 'Email', 'Department', 'Action'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Populate the table with data
    data.forEach(employee => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const key = header.replace(/ /g, '').toLowerCase(); // Convert header to lowercase and remove spaces
            const td = document.createElement('td');

            if (header === 'Action') {
                // Create action buttons
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.classList.add("updateButton")
                updateButton.onclick = () => updatedEmployee(employee); // Assign click handler
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add("deleteButton");
                deleteButton.onclick = () => deleteEmployee(employee.id); // Assign click handler
                
                // Append buttons to the cell
                td.appendChild(updateButton);
                td.appendChild(deleteButton);
            } else {
                td.textContent = employee[key];
            }

            // td.textContent = employee[key];
            row.appendChild(td);
        });

        table.appendChild(row);
    });
    
    resultsDiv.appendChild(table);
}

// Example action functions
function updatedEmployee(employee) {
    window.location.href = `updateEmployee.html?id=${employee.id}`;
    // getSingleEmployee(employee.id);
}

// function getSingleEmployee(id){
//     // fetch(`http://localhost:5000/get-single-employee/${id}`)
//     // .then(response => response.json())
//     // .then(data => console.log(data))
//     // .catch(error => console.error('error', error));
//     console.log(id);
// };

document.addEventListener('DOMContentLoaded', function() {
    showEmployees();
});


// document.getElementById('updatePage').addEventListener('DOMContentLoaded', function(){
    // const id = getQueryParam('id');
    // getSingleEmployee(id);
// })