const dataMethods = require('./data');

function getEmployees() {
    return dataMethods.getEmployees();
}

function getEmployee(id) {
    return dataMethods.getEmployee(id);
}

async function getFirstName(id) {
    var result = await dataMethods.getEmployee(id);
    return result.first_name;
}

async function getLastName(id) {
    var result = await dataMethods.getEmployee(id);
    return result.last_name;
}

async function getMiddleInitial(id) {
    var result = await dataMethods.getEmployee(id);
    return result.mid_initial;
}

async function getJobTitle(id) {
    var result = await dataMethods.getEmployee(id);
    return result.job_title;
}

async function getMobileNumber(id) {
    var result = await dataMethods.getEmployee(id);
    return result.mobile_number;
}

async function getEmail(id) {
    var validEmailRegex = "\b[A-Z0 -9._ % +-]+@[A - Z0 - 9. -]+\.[A - Z]{ 2,} \b";
    var result = await dataMethods.getEmployee(id);
    if (validEmailRegex.test(result.email)) {
        return result.email;
    } else {
        return "invalid email stored in database please contact an admin";
    }
       
}

async function getIsManager(id) {
    var result = await dataMethods.getEmployee(id);
    return result.is_manager == 1;
}

async function getIsAdmin(id) {
    var result = await dataMethods.getEmployee(id);
    return(result.is_admin == 1);
  
}

async function createEmployee(selfid, employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin) {
    var validEmailRegex = "\b[A-Z0 -9._ % +-]+@[A - Z0 - 9. -]+\.[A - Z]{ 2,} \b";
    if (getIsManager(selfid) || getIsAdmin(selfid) && validEmailRegex.test(email)) {
        var result = await dataMethods.createEmployee(employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin);

        return result;
    } else {
        console.log('Someone without access tried to create an employee and did not have permission to do so')
        return {error : 'An employee was not able to be created in the database because you do not have permission to do so'}
    }
}
module.exports = {
    getEmployees,
    getEmployee,
    getFirstName,
    getLastName,
    getMiddleInitial,
    getJobTitle,
    getMobileNumber,
    getEmail,
    getIsManager,
    getIsAdmin,
    createEmployee
}
