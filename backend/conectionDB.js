import pg from 'pg'
const { Pool, Client } = pg
 
export const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'Integrator',
    user: 'postgres',
    password: 'postgres'
})