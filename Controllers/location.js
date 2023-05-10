const location = require("../Models/location")

exports.getlocation = (req, res) => {
    location.find({}, {})
    .then(response => {
        res.status(200).json({
            message: "Location Fetched Successfully",
            loc: response
        })
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}