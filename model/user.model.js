const db = require('../config/db');

const User = {

  findByEmail: async (email) => {
    console.log("Email =", email);
    try {
      // note the array around email
      createtable()
      const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
      console.log("findByEmail result =", rows);
      // return the first row or null if none
      return rows[0] || null;
    } catch (err) {
      console.error('Error in findByEmail:', err);
      throw err;
    }
  },

  create: async (data, cb) => {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      last_login DATETIME DEFAULT NULL,
      created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
      blocked BOOLEAN DEFAULT FALSE
    )`;
    try {
      // await db.query(createUsersTable);
      createtable()
      const [result] = await db.query('INSERT INTO users SET?', data, cb);

      cb(null, result);

    } catch (err) {
      console.error('There is a error while adding user', err);
      cb(err, null);
    }
  },

  getAll: async (cb) => {
    try {
      // Fixed SQL query - removed trailing comma and corrected 'bloked' to 'blocked'
      const [results] = await db.query('SELECT * FROM users ORDER BY last_login DESC');
      cb(null, results);
    } catch (err) {
      console.error('Error getting users:', err);
      cb(err, null);
    }
  },

  deleteUsers: async (usersData) => {
    try {
      console.log("IDs to block =", usersData);

      if (!usersData.length) {
        return { success: false, message: "No user IDs provided" };
      }

      const placeholders = usersData.map(() => '?').join(', ');
      const sql = `DELETE FROM users WHERE id IN (${placeholders})`;

      await db.query(sql, usersData);

      return { success: true, message: `${usersData.length} users deleted` };
    } catch (err) {
      console.error('Error while deleting users:', err);
      throw err;
    }
  },
  updateAndBlock: async (usersData) => {
    try {
      console.log("IDs to block =", usersData);

      if (!usersData.length) {
        return { success: false, message: "No user IDs provided" };
      }


      const placeholders = usersData.map(() => '?').join(', ');
      const sql = `UPDATE users SET blocked = 1 WHERE id IN (${placeholders})`;

      await db.query(sql, usersData);

      return { success: true, message: `${usersData.length} users blocked` };
    } catch (err) {
      console.error('Error while blocking users:', err);
      throw err;
    }
  },

  updateAndUnblock: async (usersData) => {
    try {
      console.log("IDs to block =", usersData);

      if (!usersData.length) {
        return { success: false, message: "No user IDs provided" };
      }

      const placeholders = usersData.map(() => '?').join(', ');
      const sql = `UPDATE users SET blocked = 0 WHERE id IN (${placeholders})`;

      await db.query(sql, usersData);

      return { success: true, message: `${usersData.length} users unblocked` };
    } catch (err) {
      console.error('Error while unblocking users:', err);
      throw err;
    }
  },

  updateLastLogin: async (email) => {
    try {
      await db.query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE email =?',
        [email]
      );
    } catch (err) {
      console.error('Error:', err);
      throw err;
    }
  },

};

async function createtable() {

  const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login DATETIME DEFAULT NULL,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    blocked BOOLEAN DEFAULT FALSE
  )`;

  try {
    await db.query(createUsersTable);
    console.log("Table created or already exists");
  } catch (err) {
    console.error("error", err);
  }
}


module.exports = User;
