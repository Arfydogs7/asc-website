const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")(session)

//routers
const indexRouter = require("./routes/index")
const tutorRouter = require("./routes/tutors")
const resourceRouter = require("./routes/resources")
const announRouter = require("./routes/announcements")
const userRouter = require("./routes/auth")

//set views
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

//middleware
app.use(expressLayouts)
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }))

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())

//load config
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require("dotenv").config()
    dotenv.config({ path: "./config/config.env" })
}
require("./config/passport")(passport)

//connect to database
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
app.use("/resources", resourceRouter)
app.use("/announcements", announRouter)
app.use("/auth", userRouter)

app.listen(process.env.PORT || 3000)