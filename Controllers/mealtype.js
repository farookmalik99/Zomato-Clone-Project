const mealtype = require("../Models/mealtype")

exports.getmealtype = (req, res) => {

    mealtype.find()
    .then(response => {
        res.status(200).json({
            message: "Mealtype Fetched Successfully",
            mealtype: response
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}