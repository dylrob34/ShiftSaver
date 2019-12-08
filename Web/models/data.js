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

function editEmployee(employee_id, phone, email) {
    return new Promise((resolve) => {
        console.log(email);
        connection.query("UPDATE employee SET phone_number='" + phone + "', email='" + email + "' WHERE employee_id='" + employee_id + "';", (error, result) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
}

function deleteEmployee(employee_id) {
    return new Promise((resolve) => {
        connection.query("DELETE FROM employee WHERE employee_id=" + employee_id + ";", (error, result) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
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


function createShift(shift_date, start_time, end_time, employee){
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO shifts_records values("
        + null + ","
        + employee + ","
        + "'" + shift_date + "'" + ","
        + "'" + start_time + ":00:00'" + ","
        + "'" + end_time + ":00:00'"
        + ")",(error, result) => {
            if (error) {
                    console.log("error inserting a shift");
                } else {
                    resolve(result);
                }
            }
            
        
        );
    });

} 

function deleteShift(shift_id) {
    return new Promise((resolve) => {
        connection.query("DELETE FROM shifts_records WHERE shift_id=" + shift_id + ";", (error, result) => {
            if (error) {
                console.log("error deleting shift");
                resolve(false);
            } else {
                resolve(result);
            }
        });
    })
}

function updateShift(shift_id, employee_id) {
    return new Promise((resolve) => {
        connection.query("UPDATE shifts_records SET employee_id=" + employee_id + " WHERE shift_id=" + shift_id), (error, result) => {
            if (error) {
                console.log("error reassigning shfit");
                resolve(false);
            } else {
                resolve(true);
            }
        }
    })
}

function getShiftRecordByEmployee(Employee_id) {
    return new Promise((resolve, reject) => {
        connection.query("select dayname(shift_date) as day, dayofmonth(shift_date) as mydate, hour(start_time) as start, hour(end_time) as end from shifts_records where employee_id=" + Employee_id + " and shift_date between date(NOW()) and (date(NOW()) + interval 14 day)"+"order by day ASC", (error, result) => {
            if (error) {
                    console.log("something broke");
                    return reject(false);
                } else {
                    resolve(result);
                }
            });
    });
}//select shift_date,start_time,end_time FROM shift as s ,shift_record as sr WHERE s.shift_id = sr.shift_id AND sr.employee_id =" + Employee_id + " AND s.shift_date BETWEEN NOW() AND(NOW() + INTERVAL 14 DAY)
function getShiftRecordByEmployeeMonth(Employee_id, month) {
    return new Promise((resolve, reject) => {
        connection.query("select shift_date from shifts_records where employee_id=" + Employee_id + " and shift_date between date(NOW()) and (date(NOW()) + interval 14 day)", (error, result) => {
            if (error) {
                    console.log("something broke");
                    return reject(false);
                } else {
                    resolve(result);
                }
            });
    });
}


  function getShiftRecordByDate(shift_date) {
    return new Promise( (resolve) => {
        connection.query("SELECT * FROM shifts_records WHERE shift_date='" + shift_date + "'", (error, result) => {
            if (error) {
                resolve(false);
            } else {
                resolve(result);
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
      getShiftRecordById,
      getShiftRecordByEmployeeMonth,
      createShift,
      deleteShift,
      updateShift,
      editEmployee,
      deleteEmployee
  };