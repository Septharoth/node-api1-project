let users = [
    {
        id: "1",
        name: "Joe",
        bio: "Person"
    },
    {
        id: "2",
        name: "Jason",
        bio: "Person"
    }
]

function getAllUsers() {
    return users
}

function getUById(id) {
    return users.find(i => i.id === id)
}

function createUser(data) {
    const user = {
        id: String(users.length + 1),
        ...data
    }

    users.push(user)
    return user
}

function updateUser(id, data) {
    users[id - 1] = {
        id: id,
        ...data
    }
    
    return users[id - 1]
}  

function delUser(id) {
    users = users.filter(i => i.id != id)
}

module.exports = {
    getAllUsers,
    getUById,
    createUser,
    updateUser,
    delUser
}