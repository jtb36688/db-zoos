const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);

module.exports = {
    add,
    get,
    getById,
    remove,
    modify
}

function add(table, request) {
    return db(`${table}`).insert(request)
}

function get(table) {
    return db(`${table}`)
}

function getById(table, id) {
    return db(`${table}`).where({ id: id })
}

function remove(table, id) {
    return db(`${table}`).where({ id: id }).del()
}

async function modify(table, id, request) {
    const conditional = await db(`${table}`).where('id', Number(id)).update(request)
    if (conditional) {
    return getById(table, id)}
    else {return null}}