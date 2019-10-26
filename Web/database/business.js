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
    var result = await dataMethods.getEmployee(id);
    return result.email;
}

async function getIsManager(id) {
    var result = await dataMethods.getEmployee(id);
    return result.is_manager;
}

async function getIsAdmin(id) {
    var result = await dataMethods.getEmployee(id);
    return result.is_admin;
}

async function createEmployee(employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin) {
    var result = await dataMethods.createEmployee(employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin);
    return result;
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
