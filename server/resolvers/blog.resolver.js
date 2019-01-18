const Scalar = require('../scalars');
const controller = require('../controllers/blog.controller');

const data = [{
    id: 1,
    title: 'Mi Box',
    introduction: 'mi.com',
},
{
    id: 2,
    title: 'Mi Light',
    introduction: 'mi.com',
},
{
    id: 3,
    title: 'Mi Phone',
    introduction: 'mi.com',
},
{
    id: 4,
    title: 'Mi Band',
    introduction: 'mi.com',
},
{
    id: 5,
    title: 'Mi Bike',
    introduction: 'mi.com',
}
];

const Query = {
    getBlogs: () => {
        return data
    },
    getBlogById: (v, args) => {
        let temp = null;
        data.forEach(blog => {
            if (blog.id == args.id) {
                temp = blog;
            }
        });
        return temp;
    }
}

const Mutation = {
    createBlog: (v, args) => {
        data.push(args.blog);
        return data[data.length - 1];
    },
    updateBlog: (v, args) => {
        let temp = null;
        data.forEach((blog, index) => { 
            if (blog.id == args.blog.id) {
                data.splice(index, 1, args.blog)
                temp = data[index];
            }
        });
        return temp;
    },
    deleteBlog: (v, args) => {
        data.forEach((blog, index) => {
            if (blog.id == args.id) {
                data.splice(index, 1)
            }
        });
        return data;
    }
}

const { Date, Json } = Scalar;

module.exports = { Query, Mutation, Date, Json };