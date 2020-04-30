import React from 'react';
import LinkButton from '../LinkButton';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Tooltip, Grid, Link } 
    from '@material-ui/core';
import { GitHub } from '@material-ui/icons';

import TripPlanner from '../../images/TripPlanner.jpg';

const useStyles = makeStyles({
    root: {
        marginTop: 10
    },
    media: {
        height: 280,
        maxHeight: '50%',
        margin: 5
    },
});

export default function TripPlannerCard() {
    const classes = useStyles();

    return(
        <Grid container>
            <Grid item>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image={TripPlanner}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Trip Planner
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Web application for mapping latitude and longitude coordinates
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="Go to application" aria-label="go to application">
                            <div>
                                <LinkButton variant='outlined' to="/TripPlanner"> Demo </LinkButton>
                            </div>
                        </Tooltip>
                        <Tooltip title="View source code" aria-label="view source code">
                            <Link href='https://github.com/jackv545/TripPlanner' target="_blank" rel="noopener">
                                    <IconButton><GitHub/></IconButton>
                            </Link>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
