const express = require ('express')

const LocationController = require("../Controllers/location")
const restaurantcontroller = require("../Controllers/restaurants")
const mealtypecontroller = require ("../Controllers/mealtype")
const userController = require("../Controllers/user")
const menucontroller = require("../Controllers/menu")

const router = express.Router()

router.get('/Location',LocationController.getlocation)
router.get('/restaurant/:locationid', restaurantcontroller.getrestaurantbylocationid)
router.get('/Mealtype',mealtypecontroller.getmealtype)
router.post('/signup',userController.postSignUp)
router.post('/login',userController.postlogin)
router.post('/filter',restaurantcontroller.postfilter)
router.get('/Restaurants/:id', restaurantcontroller.getrestaurantbyid)
router.get('/menu/:resId', menucontroller.getmenubyresId)


module.exports = router

