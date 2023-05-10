const user = require("../Models/user")

exports.postSignUp = (req, res) => {
    const { email, password, name } = req.body
    const userObj = new user({
        email,
        password,
        name
    })

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "User details saved succesfully",
                Signup: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.postlogin = (req, res) => {
    const { email, password } = req.body
    user.find({
        email,
        password
    })

        .then(response => {
            if (response.length > 0) {

                res.status(200).json({
                    message: "User details are verified",
                    isAuthenticated: true,
                    Login: response
                })
            } else {
                res.status(200).json({
                    message: "User details are not verified",
                    isAuthenticated: false,
                    Login: response
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}