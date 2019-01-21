const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const blog_router = require('./routes/blog.route');
const dbConnection = require('./config/db.config');
const corsOptions = require('./config/cors.config');
const app = express();

dbConnection.connect();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/blog', blog_router);

app.use(cors(corsOptions));

app.listen({ port: 8088 }, () =>
  console.log(`🚀 Server ready at http://localhost:8088`)
);