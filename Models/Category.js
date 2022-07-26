const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    releasedDate: {
        type: String,
        required: true
    }
},
{timestamps: true}
)
module.exports = mongoose.model('Category', categorySchema);