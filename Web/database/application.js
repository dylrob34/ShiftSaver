const dataMethods = require('./data');

function getEmployees() {
    return dataMethods.getEmployees();
}

function getEmployee(id) {
    return dataMethods.getEmployee(id);
}

function getFirstName(id) {
    return dataMethods.getEmployee(id).first_name;
}

function getLastName(id) {
    return dataMethods.getEmployee(id).last_name;
}

function getMiddleInitial(id) {
    return dataMethods.getEmployee(id).mid_initial;
}

function getJobTitle(id) {
    return dataMethods.getEmployee(id).job_title;
}

function getMobileNumber(id) {
    return dataMethods.getEmployee(id).mobile_number;
}

function getEmail(id) {
    return dataMethods.getEmployee(id).email;
}

function getIsManager(id) {
    return dataMethods.getEmployee(id).is_manager;
}

function getIsAdmin(id) {
    return dataMethods.getEmployee(id).is_admin;
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
    getIsAdmin
}