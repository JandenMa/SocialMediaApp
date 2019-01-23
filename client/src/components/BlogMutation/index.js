import React from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';
import DetailDialog from '../DetailDialog'

const GQL = {
    SAVE_BLOG: gql`
        mutation SaveBlog($blog:InputBlog){
            saveBlog(blog:$blog){
                id,title,introduction,createTime,lastUpdateTime,content
            }
        }`,
    BLOG_LIST: gql`
    {
        getBlogs{
            id,title,introduction,lastUpdateTime
        }
    }`
}

const _mutateUpdate = (cache, { data: { saveBlog } }) => {
    let { getBlogs } = cache.readQuery({
        query: GQL.BLOG_LIST,
    })
    let isNew = true;
    getBlogs.forEach(({ id }, index) => {
        if (id === saveBlog.id) {
            getBlogs.splice(index, 1, saveBlog);
            isNew = false;
        }
    })
    if (isNew) {
        getBlogs = getBlogs.concat([saveBlog]);
    }
    cache.writeQuery({
        query: GQL.BLOG_LIST,
        data: { getBlogs },
    })
}

export const BlogMutation = () => {
    return (
        <Mutation mutation={GQL.SAVE_BLOG} update={_mutateUpdate}>
            {(doMutate, { data }) => {
                return (<DetailDialog doMutate={doMutate} data={data} />)
            }}
        </Mutation>
    )
}