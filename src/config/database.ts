import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to initialize and return a database connection
export async function openDB() {
    // Open the database
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    return db;
}