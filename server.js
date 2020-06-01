const express = require('express')

const app = express();

app.listen(9000, (err) => {
    console.log(err)
})

app.get("/", (req, res) => {
    res.send({ name: "quan" })
})

app.get("/profiles", (req, res) => {
    res.send({ data: ["quan", "nghia", "bach"] })
})

app.get("/profiles/:id", (req, res) => {
    console.log(req.params.id)
    res.send({ name: req.params.id })
})



