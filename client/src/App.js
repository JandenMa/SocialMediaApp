import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import Client from './components/ApolloClient';
import NavBar from './components/NavBar';
import BlogList from './components/BlogList';
import MyBlogs from './components/MyBlogs';
import { BlogMutation } from './components/BlogMutation';

export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={Client}>
                <div>
                    <BrowserRouter>
                        <div>
                            <NavBar />
                            <Switch>
                                <Route path="/" exact><BlogList /></Route>
                                <Route path="/myblogs"><MyBlogs /></Route>
                            </Switch>
                        </div>
                    </BrowserRouter>
                    <BlogMutation />
                </div>
            </ApolloProvider>
        )
    }
}
