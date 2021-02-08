const fs = require('fs')
const data = require("./data.json")
const { age } = require('./utils')

exports.show = function(req, res) {
  const { id } = req.params

  const foundTeacher = data.teachers.find(function(teacher) {
    return teacher.id == id
  })

  if(!foundTeacher) return res.send("Teacher not found!")

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    services: foundTeacher.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
  }

  return res.render("school/show", {teacher} )
}

exports.post = function(req, res) {
    
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all the fields')
        }  
    }

    let { avatar_url, name, birth, services, type, graduation} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)

    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        graduation,
        type,
        services,
        created_at,
    })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect("/school")
  })

  /* return res.send(req.body) */

}