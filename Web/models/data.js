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
                resolve(result[0]);
            }
        });
    });
}

  function getShiftRecordById(shift) {
    return new Promise( (resolve, reject) => {
        connection.query("SELECT * FROM shift_record WHERE shift_id='" + shift + "'", (error, result) => {
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

  function createEmployee(employee_id, first_name, last_name, middle_inital, job_title, phone, email, manager, admin, pass) {
    return new Promise( (resolve, reject) => {
        connection.query("INSERT INTO employee values ("
            + employee_id + ","
            + "'" + first_name + "'" + ","
            + "'" + last_name + "'" + ","
            + "'" + middle_inital + "'" + ","
            + "'" + job_title + "'" + ","
            + phone + ","
            + "'" + email + "'" + ","
            + manager + ","
            + admin + ","
            + pass
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
      getShiftRecordById,
      getShiftRecordByDate,
      getShifts,
      createEmployee
  };