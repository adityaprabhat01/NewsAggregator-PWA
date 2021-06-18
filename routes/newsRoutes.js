const express = require('express')
const router = express.Router()

const category = require('../controller/category')
const topHeadlines = require('../controller/topHeadlines')

router.get('/', topHeadlines.renderPage)

router.get('/business', category.renderPage)

router.get('/entertainment', category.renderPage)

router.get('/health', category.renderPage)

router.get('/science', category.renderPage)

router.get('/sports', category.renderPage)

router.get('/technology', category.renderPage)

router.get('/fallback', category.renderPage)

module.exports =  router