import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import NavBar from './components/NavBar';
import BlogList from './components/BlogList';
import DetailDialog from './components/DetailDialog';

const client = new ApolloClient({
    uri: 'http://localhost:8088/blog/graphql'
})

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <div>
                    <NavBar />
                    <BlogList />
                    <DetailDialog />
                </div>
            </ApolloProvider>
        )
    }
}
