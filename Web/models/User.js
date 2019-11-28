var user;
function User(id, first, last, middle, job, email, is_Manager, is_Admin, phoneNumber, pass) {
    user = {
        employee_id: id, first_name: first, last_name: last,
        middle_inital: middle, job_title: job, email: email, manager: is_Manager,
    admin: is_Admin, phone : phoneNumber, password:pass} 
}

function setid(id) {
    user.employee_id = id;
}
function setfirst(first) {
    user.first_name = first;
}
function setLast(last) {
    user.last_name = last;
}
function setMiddle(middle) {
    user.middle_inital = middle;
}
function setJob(job) {
    user.job_title = job;
}
function setEmail(email) {
    user.email = email;
}
function setis_Manager(man) {
    user.manager = man;
}
function setis_Admin(admin) {
    user.is_Admin = admin;
}
function setPhone(number) {
    user.phoneNumber = number;
}

function getUser() {
    return user;
}

module.exports{
    User
}