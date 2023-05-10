const restaurants = require("../Models/restaurant")

exports.getrestaurantbyid = (req, res) => {

    const { id } = req.params;

    restaurants.findById(id)
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched by ID Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getrestaurantbylocationid = (req, res) => {

    const { locationid } = req.params

    restaurants.find({ city: locationid }, {})
        .then(response => {
            res.status(200).json({
                message: "Restaurants Fetched Successfully",
                restaurants: response
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.postfilter = (req, res) => {
    var { mealtype, hcost, lcost, sort, page, cuisine, location } = req.body

    sort = sort ? sort : 1
    page = page ? page : 1

    const itemperpage = 2
    let startindex = page * itemperpage - itemperpage
    let endindex = page * itemperpage

    let filterObj = {}

    mealtype && (filterObj["type.mealtype"] = mealtype)
    location && (filterObj["city"] = location)
    lcost && hcost && (filterObj["cost"] = { $gte: lcost, $lte: hcost })
    cuisine && (filterObj["Cuisine.cuisine"] = { $in: [cuisine] })

    console.log(filterObj);

    restaurants.find(filterObj).sort({ cost: sort })
        .then(response => {
            const filteredsresponse = response.slice(startindex, endindex)
            res.status(200).json({
                message: "Restaurants Fetched Successfully",
                restaurants: filteredsresponse
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}