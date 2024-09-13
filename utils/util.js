function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
    }
    function getSingleEmployee(id){
        fetch(`http://localhost:5000/getsingle-employee/${id}`)
        .then(response => response.json())
        .then(data => {
            insertValue(data);
        })
        .catch(error => console.error('error', error));
        console.log(id);
    };
    function insertValue(singleEmployee){
        // console.log(singleEmployee);
        const name = document.getElementById('name');
        name.value = singleEmployee.name;
        const age = document.getElementById('age');
        age.value = singleEmployee.age;
        const gender = document.getElementById('gender');
        gender.value = singleEmployee.gender;
        const birthdate = document.getElementById('birthdate');
        birthdate.value = singleEmployee.birthdate;
        const email = document.getElementById('email');
        email.value = singleEmployee.email;
        const contactNo = document.getElementById('contactNo');
        contactNo.value = singleEmployee.contactNo;
        const emergencyContactNo = document.getElementById('emergencyContactNo');
        emergencyContactNo.value = singleEmployee.emergencyContactNo;
        const bloodGroup = document.getElementById('bloodGroup');
        bloodGroup.value = singleEmployee.bloodGroup;
        const presentAddress = document.getElementById('presentAddress');
        presentAddress.value = singleEmployee.presentAddress;

        const permanentAddress = document.getElementById('permanentAddress');
        permanentAddress.value = singleEmployee.permanentAddress
        const department = document.getElementById('department');
        department.value = singleEmployee.department;
    }
    document.addEventListener('DOMContentLoaded', function(){
        const id = getQueryParam('id');
        getSingleEmployee(id);
    })