// Backend/config/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres.lerzcumnybjpexgmttty",
    host: "aws-0-us-west-1.pooler.supabase.com",
    database: "postgres",
    password: "bancodeproyectos",
    port: 6543,
});

export { pool };