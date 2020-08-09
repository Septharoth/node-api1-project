const express = require("express")
const server = express()

const db = require("./database")

server.use(express.json())

// getAllUsers
server.get('/users', (req, res) => {
    const all = db.getAllUsers()
    if (!all) {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.json(all)
    }
})

// getUById
server.get('/users/:id', (req, res) => {
    const user = db.getUById(req.params.id)

    if (!user) {
        res.status(404).json({ errorMessage: "The users information could not be retrieved." })
    } else {
        res.json(user)
    }
})

// createUser
server.post('/users', (req, res) => {
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        const user = db.createUser({
            name: req.body.name,
            bio: req.body.bio
        })
    
        if (user) {
            res.status(201).json(user)
        } else {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})

//updateUser
server.put("/users/:id", (req,res) => {
    const user = db.getUById(req.params.id)
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (user) {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            db.updateUser(req.params.id, {
                name: req.body.name, 
                bio: req.body.bio
            })
            res.json(res.body)
        }
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

// deleteUser
server.delete('/users/:id', (req, res) => {
    const user = db.getUById(req.params.id)
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (user) { 
        db.deleteUser(req.params.id)
        res.status(204).end()
    } else {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

//connect
server.listen(5000, () => {
    console.log(`Server started on port 5000`) // I used ` quotes to remind myself I can set the port to a variable in a config file somewhere and just do `${port}` for this log lol
})