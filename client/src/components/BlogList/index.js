import React, { Component } from 'react';
import {
    Card, CardActionArea, CardMedia, CardContent, CardActions, Typography, Button
} from '@material-ui/core'
import './index.css';

export default class BlogList extends Component {
    render() {
        return (
            <div className="blog_list">
            {/* the codes below me is the static codes for test using */}
            <Card className="blog_item">
                <CardActionArea>
                    <CardMedia className="blog_item_media"
                        image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/desklampnew.jpg"
                        title="Mi LED Desk Lamp"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                        Mi LED Desk Lamp
                        </Typography>
                        <Typography component="p">
                        Intuitive brightness and color temperature adjustment
Works with the Google Assistant 
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className="blog_item">
                <CardActionArea>
                    <CardMedia className="blog_item_media"
                        image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/Mi-box-s.jpg"
                        title="Mi Box S"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                        Mi Box S
                        </Typography>
                        <Typography component="p">
                        4K Ultra HD Streaming Media Player
Google Assistant | Chromecast built-in 
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className="blog_item">
                <CardActionArea>
                    <CardMedia className="blog_item_media"
                        image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/lazerprojectnew.jpg"
                        title="Mi Laser Projector 150"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                        Mi Laser Projector 150
                        </Typography>
                        <Typography component="p">
                        Ultra-short throw distance
A massive screen for your home 
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className="blog_item">
                <CardActionArea>
                    <CardMedia className="blog_item_media"
                        image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/Scooter-banner.jpg"
                        title="Mi Electric Scooter"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                        Mi Electric Scooter
                        </Typography>
                        <Typography component="p">
                        Intuitive and easy-to-learn,
18.6 miles long-range battery life
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
                <Card className="blog_item">
                    <CardActionArea>
                        <CardMedia className="blog_item_media"
                            image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/desklampnew.jpg"
                            title="Mi LED Desk Lamp"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                            Mi LED Desk Lamp
                            </Typography>
                            <Typography component="p">
                            Intuitive brightness and color temperature adjustment
Works with the Google Assistant 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="blog_item">
                    <CardActionArea>
                        <CardMedia className="blog_item_media"
                            image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/Mi-box-s.jpg"
                            title="Mi Box S"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                            Mi Box S
                            </Typography>
                            <Typography component="p">
                            4K Ultra HD Streaming Media Player
Google Assistant | Chromecast built-in 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="blog_item">
                    <CardActionArea>
                        <CardMedia className="blog_item_media"
                            image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/lazerprojectnew.jpg"
                            title="Mi Laser Projector 150"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                            Mi Laser Projector 150
                            </Typography>
                            <Typography component="p">
                            Ultra-short throw distance
A massive screen for your home 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className="blog_item">
                    <CardActionArea>
                        <CardMedia className="blog_item_media"
                            image="https://i01.appmifile.com/webfile/globalimg/us/USBanner/Scooter-banner.jpg"
                            title="Mi Electric Scooter"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h3" className="blog_item_title">
                            Mi Electric Scooter
                            </Typography>
                            <Typography component="p">
                            Intuitive and easy-to-learn,
18.6 miles long-range battery life
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}
