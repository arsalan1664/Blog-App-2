const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const colors = require("colors")
const morgan = require("morgan")
const connectDB = require("./config/db")
const userRoute = require("./routes/userRoute")
const blogRoute = require("./routes/blogRoute")


// dotenv
dotenv.config()

// mongo
connectDB()

// rest object
const app = express()


// midddlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))


// route
app.use('/api/v1/user', userRoute)
app.use('/api/v1/blog', blogRoute)

// port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, (req, res) => {
    console.log(`Server Running At Port ${PORT}`.bgCyan.black);
})
