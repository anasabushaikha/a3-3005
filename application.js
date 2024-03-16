const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'University',
    password: 'Ibrahim2013',
    port: 5432,
});


