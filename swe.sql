/* THIS IS OUTDATED
employee table is correct,
adderss was never used,
and shift_record was changed a few
times, is no longer correct */

CREATE TABLE EMPLOYEE 
(employee_id CHAR(7) PRIMARY KEY,
first_name VARCHAR(15) NOT NULL,
last_name VARCHAR(15) NOT NULL,
mid_initial CHAR,
job_title VARCHAR(15),
mobile_number INT,
email VARCHAR(50),
is_manager BOOLEAN,
is_admin BOOLEAN);
                    
CREATE TABLE ADDRESS
(employee_id CHAR(7) NOT NULL,
zip int NOT NULL,
street VARCHAR(30),
city VARCHAR(30),
a_state VARCHAR(30),
CONSTRAINT ADDPK
PRIMARY KEY (employee_id, zip),
CONSTRAINT ADDR_EMPFK
FOREIGN KEY (employee_id) REFERENCES EMPLOYEE(employee_id)
ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE SHIFT_RECORD	
(shift_id CHAR(7) PRIMARY KEY,
job_title_required VARCHAR(15) NOT NULL,
employee_id CHAR(7) NOT NULL,
shift_date DATE NOT NULL, /*'YYYY-MM-DD' format*/
start_time TIME NOT NULL, /*'hh:mm:ss' format*/
end_time TIME,
CONSTRAINT SHIFT_EMPFK
FOREIGN KEY(employee_id) REFERENCES EMPLOYEE(employee_id)
ON DELETE CASCADE ON UPDATE CASCADE);

