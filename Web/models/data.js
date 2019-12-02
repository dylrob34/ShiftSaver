const mysql = require('mysql');

// creates connection string to the database. These credentials are in the .env file
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DB,
});
  
// uses the connection string to establish a connection with the database
connection.connect(function(error) {
    if (error) {
        console.log("Error: could not connect to database...");
    } else {
        console.log("Connected to Database");
    }
});

function getEmployee(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM employee WHERE employee_id='" + id + "'", (error, result) => {
            if (error) {
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function getEmployees() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM employee", (error, result) => {
            if (error) {
                return reject(false);
            } else {
                resolve(result);
            }
        });
    });
}

  function getShiftRecordById(id) {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM shift_record WHERE shift_id='" + id + "'", (error, result) => {
            if (error) {
                return reject(false);
            } else {
                resolve(result[0]);
            }
        });
    });  
}
function getShiftRecordByEmployee(Employee_id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM shift_record WHERE employee_id='" + Employee_id + "' AND BETWEEN  '"
            + "CONVERT(VARCHAR(10), getdate(), 111)" + ' AND '
            + "DATEADD(week, 2, getdate())" + "'", (error, result) => {
                if (error) {
                    return reject(false);
                } else {
                    resolve(result[0]);
                }
            });
    });
}

  function getShiftRecordByDate(shift_Date) {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM shift_record WHERE shift_date='" + shift_date + "'", (error, result) => {
            if (error) {
                return reject(false);
            } else {
                resolve(result[0]);
            }
        });
    });
  }

  function getShifts() {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM shift_record", (error, result) => {
            if (error) {
                return reject(false);
            } else {
                resolve(result[0]);
            }
        });
    });
  }

  function getAddress(employee) {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM shift_record WHERE employee_id='" + employee + "'", (error, result) => {
            if (error) {
                return reject(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function createWholeEmployee(user) {
    return new Promise((resolve, reject) => {
        console.log("INSERT INTO employee values ("
            + "'" + user.employee_id + "',"
            + "'" + user.first_name + "'" + ","
            + "'" + user.last_name + "'" + ","
            + "'" + user.middle_inital + "'" + ","
            + "'" + user.job_title + "'" + ","
            + "'" + user.email + "'" + ","
            + user.manager + ","
            + user.admin + ","
            + "'" + user.phone + "'" + ","
            + "'" + user.pass + "'"
            + ")");
        connection.query("INSERT INTO employee values ("
            + "'" + user.employee_id + "',"
            + "'" + user.first_name + "'" + ","
            + "'" + user.last_name + "'" + ","
            + "'" + user.middle_inital + "'" + ","
            + "'" + user.job_title + "'" + ","
            + "'" + user.email + "'" + ","
            + user.manager + ","
            + user.admin + ","
            + "'" + user.phone + "'" + ","
            + "'" + user.pass + "'"
            + ")", (error, result) => {
                if (error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
    });
}

  function createEmployee(employee_id, first_name, last_name, middle_inital, job_title, email, manager, admin, phone, pass) {
    return new Promise( (resolve, reject) => {
        console.log("INSERT INTO employee values ("
        + "'" + employee_id + "',"
        + "'" + first_name + "'" + ","
        + "'" + last_name + "'" + ","
        + "'" + middle_inital + "'" + ","
        + "'" + job_title + "'" + ","
        + "'" + email + "'" + ","
        + manager + ","
        + admin + ","
        + "'" + phone + "'" + ","
        + "'" + pass + "'"
        + ")");
        connection.query("INSERT INTO employee values ("
            + "'" + employee_id + "',"
            + "'" + first_name + "'" + ","
            + "'" + last_name + "'" + ","
            + "'" + middle_inital + "'" + ","
            + "'" + job_title + "'" + ","
            + "'" + email + "'" + ","
            + manager + ","
            + admin + ","
            + "'" + phone + "'" + ","
            + "'" + pass + "'"
            + ")", (error, result) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
  }

  module.exports = {
      getAddress,
      getEmployee,
      getEmployees,
      getShiftRecordByEmployee,
      getShiftRecordById,
      getShiftRecordByDate,
      getShifts,
      createEmployee,
      createWholeEmployee,
      getShiftRecordById
  };