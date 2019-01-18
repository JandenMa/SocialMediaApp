const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const requireText = require('require-text');
const typeDefs = requireText('../typeDefs/blog.typeDefs.gql',require);
const resolvers = require('../resolvers/blog.resolver');

//initialize a router for blog api
const app = express.Router();

//create a apollo server with the blog schema
// const server = new ApolloServer({ schema });
const server = new ApolloServer({ typeDefs,resolvers });

//add the router into server
server.applyMiddleware({ app })

//export it
module.exports = app;