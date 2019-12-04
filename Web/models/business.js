const dataMethods = require('./data');


async function createShift(shift_date, start_time, end_time, employee) {
    return await dataMethods.createShift(shift_date, start_time, end_time, employee);
}

async function deleteShift(shift_id) {
    return await dataMethods.deleteShift(shift_id);
}

async function updateShift(shift_id, employee_id) {
    return await dataMethods.updateShift(shift_id, employee_id);
}

async function getShiftsByDay(day) {
    var shifts = await dataMethods.getShiftRecordByDate(day);
    return shifts
}

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
    return result.is_manager == 1;
}

async function getIsAdmin(id) {
    var result = await dataMethods.getEmployee(id);
    return(result.is_admin == 1);
}

async function editInfo(id, email, phone) {
    var validEmailRegex = "\b[A-Z0 -9._ % +-]+@[A - Z0 - 9. -]+\.[A - Z]{ 2,} \b";
    if(validEmailRegex.test(email)){
        var result = await dataMethods.editEmployee(id, phone, email);
        return result
    }else{
        return {error: 'Invalid Email Edit'}
    }
}

async function deleteEmployee(employee_id) {
    var result = await dataMethods.deleteEmployee(employee_id);
    return result;
}


async function getShiftsByEmployee(selfid, id) {
    if (selfid == id || getIsManager(selfid) || getIsAdmin(selfid)) {
        var result = await dataMethods.getShiftRecordByEmployee(id);
        return result;
    } else {
        return {  error:  'Cannot access shifts'  };
    }
}
async function getShiftsByEmployeeMonth(id, month) {
    var result = await dataMethods.getShiftRecordByEmployeeMonth(id, month);
    return result;
}

async function createEmployee(selfid, employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin, pass) {
    var validEmailRegex = "\b[A-Z0 -9._ % +-]+@[A - Z0 - 9. -]+\.[A - Z]{ 2,} \b";
    if (getIsManager(selfid) || getIsAdmin(selfid) && validEmailRegex.test(email)) {
        var result = await dataMethods.createEmployee(employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin, pass);

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
    createEmployee,
    getShiftsByEmployee,
    getShiftsByEmployeeMonth,
    createShift,
    getShiftsByDay,
    deleteShift,
    updateShift,
    editInfo,
    deleteEmployee
}
