const express = require('express')
const router = express.Router()

const category = require('../controller/category')
const topHeadlines = require('../controller/topHeadlines')

router.get('/category_headline', category.category_headline)

router.get('/', topHeadlines.topHeadlines)

router.get('/business', category.category)

router.get('/entertainment', category.category)

router.get('/health', category.category)

router.get('/science', category.category)

router.get('/sports', category.category)

router.get('/technology', category.category)

router.get('/fallback', category.category)

module.exports =  router

// http://localhost:3000/category_headline/category?category=business