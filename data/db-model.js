const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development);

module.exports = {
    add,
    get,
    getById,
    delete,
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

function delete(table, id) {
    return db(`${table}`).where({ id: id }).del()
}

function modify(table, id, request) {
    return db(`${table}`).where({ id: id }).update(request)
}