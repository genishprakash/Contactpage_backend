// @desc Register a user
// @route POST api/users
// @ access public 
const asyncHandler=require('express-async-handler')
const users=require("../models/usermodel")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerController = asyncHandler(async (req, res) => {
    const {username,email,password}=req.body

    if(!username || !email || ! password){
        res.status(400)
        throw new Error("Please fill the required field")
    }
    const emailavailabe=await users.findOne({email})
    if(emailavailabe){
        res.status(400)
        throw new Error ('Email already taken ')
    }
    const hashedpassword=await bcrypt.hash(password,10)
    const user =await users.create({
        username,
        email,
        password:hashedpassword
    })
    res.status(201).json({id:user.id ,email:user.email})

})
// @desc Register a user
// @route POST api/users
// @ access public 


const loginController = asyncHandler(async (req, res) => {

    const {email,password}=req.body

    if(!email || !password){
        res.status(400)
        throw new Error('Please fill the required fields')
    }
    try{
        const user = await users.findOne({email})
        if(await bcrypt.compare(password,user.password)){
            const accessToken=jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                }
            },process.env.secretkey)
            res.status(200).json(accessToken)
        }
        else{
            res.status(400)
            throw new Error('Password mismatch')
        }
    }catch(err){
        res.status(400)
        throw new Error ('Validation Error')
    }

})
// @desc Register a user
// @route GET api/users
// @ access private 


const currentController = asyncHandler(async (req, res) => {

    res.json(req.user)

})

module.exports={registerController,loginController,currentController}