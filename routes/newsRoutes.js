const express = require("express");
const router = express.Router();

const category = require("../controller/category");
const { lastOnline, verifyCache } = require("../controller/lastOnline");
const topHeadlines = require("../controller/topHeadlines");

router.get("/lastOnline", lastOnline);
router.post("/verifyCache", verifyCache);

router.get("/", topHeadlines.headlines_template);
router.get("/business", category.category_template);
router.get("/entertainment", category.category_template);
router.get("/health", category.category_template);
router.get("/science", category.category_template);
router.get("/sports", category.category_template);
router.get("/technology", category.category_template);

router.get("/topHeadlines", topHeadlines.topHeadlines);
router.get("/category", category.category);
router.get("/category_headline", category.category_headline);

router.get("/fallback", category.category_template);

module.exports = router;
