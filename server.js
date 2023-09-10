const express=require("express")
const dotenv=require("dotenv").config()
const app=express()
const errorHandler=require("./middleware/errorHandler")
const connectDb=require("./config/dbConnection")

const PORT=process.env.PORT || 5001
connectDb()
app.use(express.json())
app.use((req, res, next) => {
    // Set the allowed origins (replace with your frontend origin)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    
    // Set other CORS headers as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight requests (OPTIONS)
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
app.use("/api/contacts",require("./routes/contacts"))
app.use("/api/users",require("./routes/users"))
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`Sever listening on port :${PORT}`)
})