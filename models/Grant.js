// models/Grant.js
const mongoose = require('mongoose');

const GrantSchema = new mongoose.Schema({
    title: String,
    description: String,
    source_url: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grant', GrantSchema);


//original
// const mongoose = require('mongoose');

// const GrantSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     program_type: String,
//     eligibility: String,
//     funding_details: String,
//     application_deadline: Date,
//     contact_info: String,
//     source_url: String
// });

// module.exports = mongoose.model('Grant', GrantSchema);
