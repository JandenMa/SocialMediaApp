/**
 * This is the Blog model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
    id: { type: String, required: true, max: 20 },
    title: { type: String, required: true, max: 40 },
    content: { type: String, required: true },
    introduction: { type: String, required: true, max: 60 },
    createTime: { type: Number, required: true, default: new Date() },
    lastUpdateTime: { type: Number, required: true, default: new Date() },
    imgSrc: { type: String, required: false, max: 120 }
});

module.exports = mongoose.model('Blog', BlogSchema);
