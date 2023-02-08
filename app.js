// importing express
const express = require('express')
const cors = require('cors')

// created a app instance from express
const app = express()

// CORS MIDDLEWARE
app.use(cors({
    origin: ['http://localhost:3000', 'https://assignment-project-one.vercel.app']
}))

// .use is called a middleware and here express.json() is parsing json data from the request.
app.use(express.json())

// this port is used for development environments. you can use others ports like: 4000, 8080, 5000 etc
const port = 1337


// this is a simple get request. when the user will request on http://localhost:1337 then user will get a json response saying 'Hello World!'
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// registration: post request
app.post('/signup', (req, res) => {
    // req.body is an object coming through request on this /signup endpoint
    const { firstName, lastName, email, password, confirmPassword } = req.body

    // after all work like validating and storing user to database(will implement soon) user will get a json response.
    res.json({
        status: 'success',
        data: {
            user: {
                firstName,
                lastName,
                email,
            }
        }
    })
})

// login: post request
app.post('/login', (req, res) => {
    const { email, password } = req.body
    res.json({
        status: 'success',
        data: {
            user: {
                email,
            }
        }
    })
})


// app.listen is for starting the server. it take a port and a callback function as arguments.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})