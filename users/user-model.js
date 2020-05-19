const bcrpyt = require('bcryptjs')
const db = require('../database/dbConfig')

function find() {
    return db("users").select("id", "username")
}

function findById(id) {
    return db("users").where("id", id).select("id", "username").first()
}

function findBy(user) {
    return db("users").where(user).select('id', 'username', 'password')
}

async function add(user) {
    user.password = await bcrpyt.hash(user.password, 14)

    const [id] = await db("users").insert(user)

    return findById(id)
}

module.exports = {
    find,
    findBy,
    findById,
    add
}