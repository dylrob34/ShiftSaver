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


function createShift(shift_date, start_time, end_time){
    return new Promise((resolve, reject) => {
        connection.query(("INSERT INTO shifts_records values ("
        + "'" + 1 + "'" + ","
        + "'" + null + "'" + ","
        + "'" + shift_date + "'" + ","
        + "'" + start_time + "'" + ","
        + "'" + end_time + "'" + ","
        + ")",(error, result) => {
            if (error) {
                    console.log("error inserting a shift");
                    return reject(false);
                } else {
                    console.log("successfuly inserted shift into table")
                    resolve(result);
                }
            }
            
        
            ));
    });

} 

function getShiftRecordByEmployee(Employee_id) {
    return new Promise((resolve, reject) => {
        connection.query("select dayname(shift_date) as day, dayofmonth(shift_date) as mydate, hour(start_time) as start, hour(end_time) as end from shift as s, shift_record as sr where sr.employee_id=" + Employee_id + " and sr.shift_id=s.shift_id and shift_date between date(NOW()) and (date(NOW()) + interval 14 day)"+"order by day ASC", (error, result) => {
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
        connection.query("select shift_date from shift as s, shift_record as sr where sr.employee_id=" + Employee_id + " and s.shift_id=sr.shift_id and shift_date between date(NOW()) and (date(NOW()) + interval 14 day)", (error, result) => {
            if (error) {
                    console.log("something broke");
                    return reject(false);
                } else {
                    resolve(result);
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
      getShiftRecordById,
      getShiftRecordByEmployeeMonth,
      createShift
  };