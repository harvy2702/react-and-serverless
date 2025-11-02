import * as sql from 'mssql';

const config: sql.config = {
    server: process.env.SQL_SERVER || '',
    database: process.env.SQL_DATABASE || '',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.SQL_USERNAME || '',
            password: process.env.SQL_PASSWORD || ''
        }
    },
    options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true,
        connectTimeout: 30000,
        requestTimeout: 30000
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
    if (!pool) {
        pool = await new sql.ConnectionPool(config).connect();
        console.log('Database connection pool created');
    }
    return pool;
}

export async function closeConnection(): Promise<void> {
    if (pool) {
        await pool.close();
        pool = null;
        console.log('Database connection pool closed');
    }
}
