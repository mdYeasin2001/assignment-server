const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'https://assignment-project-one.vercel.app']
}))

app.use(express.json())

const port = 1337
const url = process.env.DATABASE_URL

// user schema

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema)


mongoose
    .set('strictQuery', false)
    .connect(url, (err) => {
        if (err) {
            console.log("err", err)
        }
    })

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }

    User.create(req.body)
        .then(result => {
            res.json({
                status: 'success',
                data: {
                    user: result
                }
            })
        })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required!'
        })
    }
    User
        .findOne({ email, password })
        .then(result => {
            if (!result) {
                return res.json({
                    status: 'fail',
                    message: 'Invalid email or password!'
                })
            }
            res.json({
                status: 'success',
                data: {
                    user: result
                }
            })
        })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})