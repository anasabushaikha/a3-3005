//Anas Abushaikha
//ID 101285962
//Date: Monday March 18th 2024

//imports pool class from pg library
const { Pool } = require('pg');

//creating new connection to the specified postgres database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'University',
    password: 'Ibrahim2013',
    port: 5432,
});

//verifies that the connection to the databse from earlier is successful, and if not, prints message and releases resources
pool.connect((err, client, release) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      process.exit(1);
    } else {
      console.log('Connected to the database successfully!');
      release();
    }
  });

//retrives all students from the students table in the databse using a DQL statement, and prints them out
const getAllStudents = async () => {
    try {
        const res = await pool.query('SELECT * FROM students');
        console.log(res.rows);
    } catch (err) {
        //if an error occurs while querying, print out the error
        console.error(err);
    }
};

//adds a student with the given parameters to the studen table using a DML statement, and prints out the newly added student
const addStudent = async (first_name, last_name, email, enrollment_date) => {
    try {
        const res = await pool.query(
            'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, enrollment_date]
        );
        console.log(res.rows[0]);
    } catch (err) {
        //if an error occurs while querying, print out the error
        console.error(err);
    }
};

//given the id of a student in the students table and a new email, this updates the student with that id to have the new email using a DML statement
const updateStudentEmail = async (student_id, new_email) => {
    try {
        const res = await pool.query(
            'UPDATE students SET email = $2 WHERE student_id = $1 RETURNING *',
            [student_id, new_email]
        );
        console.log(res.rows[0]);
    } catch (err) {
        //if an error occurs while querying, print out the error
        console.error(err);
    }
};

//deletes a student from students table that has a matching id to the given parameter, using a DML statement
const deleteStudent = async (student_id) => {
    try {
        const res = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [student_id]);
        console.log(res.rows[0]);
    } catch (err){
        //if an error occurs while querying, print out the error
        console.error(err);
    }
};

//testing out the implemented functions from above by calling them, giving them actual values to create, update or delete which can be double-checked from the database side
(async () => {
    await getAllStudents();
    await addStudent('Timmy', 'Trevor', 'timmy.trevor@example.com', '2023-10-04');
    await updateStudentEmail(1, 'john.doe3003@example.com');
    await deleteStudent(1);
    await pool.end();
})();
