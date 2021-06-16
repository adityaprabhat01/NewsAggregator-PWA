const path = require('path')
const express = require('express')
const category = require('./backend/category')
const topHeadlines = require('./backend/topHeadlines')

const port = process.env.PORT || 3000
const app = express()

//views
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

//rendered pages
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/business', (req, res) => {
    res.render('business')
})

app.get('/entertainment', (req, res) => {
    res.render('entertainment')
})

app.get('/health', (req, res) => {
    res.render('health')
})

app.get('/science', (req, res) => {
    res.render('science')
})

app.get('/sports', (req, res) => {
    res.render('sports')
})

app.get('/technology', (req, res) => {
    res.render('technology')
})

app.get('/fallback', (req, res) => {
    res.render('fallback')
})

//routed pages
app.get('/topHeadlines', (req, res) => {
    
    topHeadlines((error, {source, title, description, url, urlToImage} = {}) => {
        
        if (error) {
            return res.send(error)
        }

        res.send({
            source,
            title,
            description,
            url,
            urlToImage
        })
    })
})

app.get('/category', (req, res) => {
    
    category(req.query.category, (error, {source, title, description, url, urlToImage} = {}) => {

        if (error) {
           return res.send(error)
        }

        res.send({
            source,
            title,
            description,
            url,
            urlToImage
        })

    })

})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})