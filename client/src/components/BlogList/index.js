import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from 'graphql-tag';
import moment from 'moment';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Tooltip,
    Button
} from '@material-ui/core'
import './index.css';

const GQL = {
    BlogList: gql`
    {
        getBlogs{
            id,title,introduction,lastUpdateTime
        }
    }`
}

export default class BlogList extends Component {
    render() {
        return (
            <div className="blog_list">
                <Grid
                    spacing={40}
                    container
                    direction="row"
                    justify="flex-start"
                    wrap="wrap">

                    <Query query={GQL.BlogList}>
                        {({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error :{error}</p>;

                            return data.getBlogs.map(({
                                id, title, introduction, lastUpdateTime
                            }) => (
                                    <Grid md={4} sm={6} xs={12} item key={id}>
                                        <Card className="blog_item">
                                            <CardActionArea>
                                                <CardMedia className="blog_item_media"
                                                    image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/desklampnew.jpg"
                                                    title="Mi LED Desk Lamp"
                                                />
                                                <CardContent>
                                                    <Tooltip title={title}>
                                                        <Typography gutterBottom variant="h6" className="blog_item_title">
                                                            {title}
                                                        </Typography>
                                                    </Tooltip>
                                                    <Typography component="p">
                                                        {introduction}
                                                    </Typography>
                                                    <hr />
                                                    <Typography component="p" className="blog_item_time">
                                                        Updated at&emsp;&emsp;{moment.unix(lastUpdateTime).format('YYYY-MM-DD HH:mm:ss')}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions className="blog_btn">
                                                <Button size="small" color="secondary">
                                                    Read More &ensp;>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ));
                        }}
                    </Query>
                </Grid>
            </div>
        )
    }
}
