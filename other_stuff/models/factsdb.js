const sqlite = require("better-sqlite3")
const fs = require("fs")

if (!fs.existsSync("db.db")) {
  fs.openSync("db.db", "w")
  let db = new sqlite("db.db")
  db.prepare("CREATE TABLE IF NOT EXISTS facts (id INTEGER primary key, text TEXT)").run()
}

class factsDB {
  constructor() {
  }
  async get_db() {
    let db = new sqlite("db.db")
    return db
  }
  async get_random_fact() {
    let db = new sqlite("db.db")
    let facts = await db.prepare('SELECT text FROM facts').all()
    return facts[Math.random()*facts.length].text
  }
}

module.exports = factsDB;
