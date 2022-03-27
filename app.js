const path = require('path')
const express = require('express')
const newsRoutes = require('./routes/newsRoutes')

const port = process.env.PORT || 5000
const app = express()

// paths
const viewsPath = path.join(__dirname, './views')
const publicDirectoryPath = path.join(__dirname, './public')

//views
app.set('view engine', 'ejs')
app.set('views', viewsPath)

// public
app.use(express.static(publicDirectoryPath))
app.use(express.json());

// routes
app.use('', newsRoutes)

// listen
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})