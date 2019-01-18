const express = require('express');
const bodyParser = require('body-parser');
const blog_router = require('./routes/blog.route');
const app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use('/blog', blog_router);

app.listen({ port: 8088 }, () =>
  console.log(`🚀 Server ready at http://localhost:8088`)
);