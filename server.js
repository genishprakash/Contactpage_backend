const express=require("express")
const dotenv=require("dotenv").config()
const app=express()
const errorHandler=require("./middleware/errorHandler")
const connectDb=require("./config/dbConnection")

const PORT=process.env.PORT || 5001
connectDb()
app.use(express.json())
app.use("/api/contacts",require("./routes/contacts"))
app.use("/api/users",require("./routes/users"))
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Sever listening on port :${PORT}`)
})