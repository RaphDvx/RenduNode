import { Pool } from 'pg';

export const pool = new Pool({
    host: 'localhost',
    port: 5432, // Par défaut pour PostgreSQL
    user: 'postgres',
    password: 'Vachette2002',
    database: 'movies_db'
});
