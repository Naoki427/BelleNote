import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    // host: process.env.PGHOST,
    // port: process.env.PGPORT,
    // user: process.env.PGUSER,
    // password: process.env.PGPASSWORD,
    // database: process.env.PGDATABASE
    connectionString: process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false,
    },
});

export default pool;