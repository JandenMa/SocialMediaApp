const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
    title: { type: String, required: true, max: 40 },
    content: { type: String, required: true },
    introduction: { type: String, required: true, max: 60 },
    createTime: { type: Date, required: true, default: new Date() },
    lastupdateTime: { type: Date, required: true, default: new Date() }
});

module.exports = mongoose.model('Blog', BlogSchema);
