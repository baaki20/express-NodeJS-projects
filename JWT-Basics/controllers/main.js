const dashboard = (req, res) => {
    res.status(200).json({msg: "Welcome Jone"})
}

const login = (req, res) => {
    res.status(200).json({msg: "Login Successfull"})
}

module.exports = {dashboard, login}