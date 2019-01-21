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

const addBlog = (blog) => {
    return new Promise((resolve) => {
        let obj = new model(blog);
        obj.save().then(data => resolve(data)).catch(err => {
            console.log(err);
            resolve(null);
        })
    })
}

const updateBlog = (blog) => {
    return new Promise((resolve) => {
        model.findOneAndUpdate({ id: blog.id }, { $set: blog }, { new: true })
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
    getBlogList, getBlogById, addBlog, updateBlog, deleteBlog
}

module.exports = controller;

