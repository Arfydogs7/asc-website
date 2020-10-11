const express = require("express")
const app = express()
const dotenv = require("dotenv")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

//routers
const indexRouter = require("./routes/index")
const tutorRouter = require("./routes/tutors")

//set views
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
    //use required modules
app.use(expressLayouts)
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

//load config
dotenv.config({ path: "./config.env" })

//connect to database
const mongoose = require("mongoose")
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
connectDB()

//connect to routes
app.use("/", indexRouter)
app.use("/tutors", tutorRouter)

app.listen(process.env.PORT || 3000)