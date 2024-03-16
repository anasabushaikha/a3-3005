const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'University',
    password: 'Ibrahim2013',
    port: 5432,
});

const getAllStudents = async () => {
    try {
        const res = await pool.query('SELECT * FROM students');
        console.log(res.rows);
    } catch (err) {
        console.error(err);
    }
};

const addStudent = async (first_name, last_name, email, enrollment_date) => {
    try {
        const res = await pool.query(
            'INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, enrollment_date]
        );
        console.log(res.rows[0]);

    } catch (err) {
        console.error(err);
    }
};

const updateStudentEmail = async (student_id, new_email) => {
    try {
        const res = await pool.query(
            'UPDATE students SET email = $2 WHERE student_id = $1 RETURNING *',
            [student_id, new_email]
        );
        console.log(res.rows[0]);
    } catch (err) {
        console.error(err);
    }
};

const deleteStudent = async (student_id) => {
    try {
        const res = await pool.query('DELETE FROM students WHERE student_id = $1 RETURNING *', [student_id]);
        console.log(res.rows[0]);

    } catch (err){
        console.error(err);
    }
};


(async () => {
    await getAllStudents();
    await addStudent('Timmy', 'Trevor', 'timmy.trevor@example.com', '2023-10-04');
    await updateStudentEmail(1, 'john.doe3003@example.com');
    await deleteStudent(1);
    await pool.end();
})();
