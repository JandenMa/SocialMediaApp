import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:8088/blog'
})

export default client 