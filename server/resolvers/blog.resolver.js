/**
 * This is the Blog Resolver for GraphQL
 */

const Scalar = require('../scalars');
const moment = require('moment');
const controller = require('../controllers/blog.controller');

const Query = {
    getBlogs: async () => {
        return await controller.getBlogList();
    },
    getBlogById: async (v, args) => {
        return await controller.getBlogById(args.id);
    }
}

const Mutation = {
    saveBlog: async (v, args) => {
        let { blog } = args;
        if (!blog.id) {
            blog.id = `BL${moment().unix()}${Math.round(Math.random() * 5000)}`;
            blog.createTime = moment().unix();
        }
        blog.lastUpdateTime = moment().unix();
        return await controller.saveBlog(blog);
    },
    deleteBlog: async (v, args) => {
        return await controller.deleteBlog(args.id);
    }
}

const { DateScalar, JsonScalar } = Scalar;

module.exports = { Query, Mutation, DateScalar, JsonScalar };