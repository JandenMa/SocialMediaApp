import React, { Component } from 'react';
import NavBar from './components/NavBar';
import BlogList from './components/BlogList';
import DetailDialog from './components/DetailDialog';

export default class App extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <BlogList />
                <DetailDialog />
            </div>
        )
    }
}
