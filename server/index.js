const express = require('express')
const cors = require('cors')
const config = require('config')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error-middleware')


const PORT = config.get('port') || 5000


const app = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: config.get('URL_CLIENT')
}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api', require('./routes/product.routes.js'))
app.use('/api', require('./routes/user.routes.js'))
app.use('/api', require('./routes/products-types.routes.js'))
app.use('/api', require('./routes/products-types-of-weight.routes.js'))
app.use(errorMiddleware)




async function start() {
    try {
        app.listen(PORT, () => {console.log('App has been started')})
    } catch(e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


