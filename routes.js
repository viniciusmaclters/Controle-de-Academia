const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', function(req, res) {
    return res.redirect("/school")
})

routes.get('/school', function(req, res) {
    return res.render("school/index")
})

routes.get('/school/create', function(req, res) {
    return res.render("school/create")
})

routes.get('/school/:id', teachers.show)

routes.post("/school", teachers.post)

routes.get('/students', function(req, res) {
    return res.send("students")
})

module.exports = routes