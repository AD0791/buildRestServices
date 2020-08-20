const express = require("express");
const app = express();
const data = require("./mock.json");
const Joi = require("joi");
// middleware
app.use(express.json());

// get
app.get("/api", (req, res) => {
    res.send(data.api);
});

// post
app.post("/api", (req, res) => {
    const {
        error
    } = validationP(req.body);
    if (error) {
        return res.status(400).send(error);
    }

    const people = {
        id: data.api.length + 1,
        first_name: req.body.first_name,
        Last_name: req.body.Last_name,
    };
    data.api.push(people);
    res.send(people);
});

// get one element by id
app.get("/api/:id", (req, res) => {
    const person = data.api.find((c) => c.id === parseInt(req.params.id));
    if (!person) return res.status(404).send("errata");
    res.send(person);
});

// Put
app.put("/api/:id", (req, res) => {
    // look up
    const person = data.api.find((c) => c.id === parseInt(req.params.id));
    if (!person) return res.status(404).send("errata");
    // validation
    const {
        error
    } = validationP(req.body);
    if (error) {
        return res.status(400).send(error);
    }
    // update course
    person.first_name = req.body.first_name;
    person.Last_name = req.body.Last_name;

    res.send(person);
});


app.delete("/api/:id", (req, res) => {
    // look up
    const person = data.api.find((c) => c.id === parseInt(req.params.id));
    if (!person) return res.status(404).send("errata");
    //delete
    const index = data.api.indexOf(person);
    data.api.splice(index, 1);

    res.send(person);
});



// validation function
function validationP(params) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        Last_name: Joi.string().min(3).required(),
    });
    return schema.validate(params);
}

// env variables
// terminal: $export PORT=5000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Port is open ${port}`);
});