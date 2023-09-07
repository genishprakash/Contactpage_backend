const asyncHandler = require("express-async-handler")
const myContacts = require("../models/contactModel.js")
// @desc Get all the contacts
// @route GET api/contacts
// @ access public 


const getController = asyncHandler(async (req, res) => {
    // Get all the contact information

    const contacts = await myContacts.find()
    res.status(200).json(contacts)
    res.status(200).json({ msg: "Get the contacts details" })

})

// @desc Create a contact
// @route POST api/contacts
// @ access public 
const postController = asyncHandler(async (req, res) => {
    console.log("The body is ", req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("Please provide valid information")
    }
    const contact = await myContacts.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact)
})
// @desc Get a contact
// @route GET api/contacts/:id
// @ access public 

const getControllerid = asyncHandler(async (req, res) => {
    try {
        const contact = await myContacts.findById(req.params.id)
        res.status(200).json(contact)

        console.log(contact);
    } catch (err) {

        res.status(404)
        throw new Error("Contact not found")
    }

})

// @desc Get a contact
// @route GET api/contacts/:id
// @ access public
const putController = asyncHandler(async (req, res) => {
    try {

        const updatedContact = await myContacts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true })
        console.log(updatedContact);
        res.status(200).json(updatedContact)
    }
    catch (err) {
        res.status(404)
        throw new Error("Contact not found")
    }
})

// @desc Delete a contact
// @route GET api/contacts/:id
// @ access public

const deleteController = asyncHandler(async (req, res) => {
    try {
        const deletedContact = await myContacts.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: `Deleted a contact ${req.params.id}` })
    }catch(err){
        res.status(404)
        throw new Error("Contact not found")
    }
})

module.exports = {
    getController,
    postController,
    getControllerid,
    putController,
    deleteController
}