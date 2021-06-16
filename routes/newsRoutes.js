const express = require('express')
const router = express.Router()
const topHeadlines = require('../controller/topHeadlines')
const category = require('../controller/category')

router.app.get('/', topHeadlines.topHeadlines)

router.app.get('/business', category.category)

router.app.get('/entertainment', category.category)

router.app.get('/health', category.category)

router.app.get('/science', category.category)

router.app.get('/sports', category.category)

router.app.get('/technology', category.category)

router.app.get('/fallback', category.category)

module.exports = { router }