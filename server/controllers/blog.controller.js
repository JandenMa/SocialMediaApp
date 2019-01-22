/**
 * This is the Blog Controller. It includes the Blog Business Logics.
 */

const model = require('../models/blog.model');

const getBlogList = () => {
    return new Promise((resolve) => {
        model.find().then(data => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })
}

const getBlogById = (id) => {
    return new Promise((resolve) => {
        model.findById(id).then(data => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })
}

const saveBlog = (blog) => {
    return new Promise((resolve) => {
        model.findOneAndUpdate({ id: blog.id }, { $set: blog }, { new: true,upsert:true })
            .then((data) => resolve(data)).catch(err => {
                console.log(err);
                resolve(null);
            })
    })
}

const deleteBlog = (id) => {
    return new Promise((resolve) => {
        model.findOneAndDelete({ id }).then(data => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })
}

const controller = {
    getBlogList, getBlogById, saveBlog, deleteBlog
}

module.exports = controller;

