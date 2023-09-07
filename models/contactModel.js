const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, " Please enter a valid email"]
    },
    phone: {
        type: String,
        required: [true, " Please enter a valid contact number"]
    },
}, {
    timestamps: true
})
module.exports=mongoose.model("myContacts",contactSchema)