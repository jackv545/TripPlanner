import React from 'react';
import LinkButton from '../LinkButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Tooltip, Grid, 
    Link, useMediaQuery } from '@material-ui/core';
import { Code } from '@material-ui/icons';

import TripPlanner from '../../images/TripPlanner.jpg';

const useStyles = makeStyles({
    project: mediaQuery => ({
        marginTop: mediaQuery.smDown ? 8 : 96,
        marginBottom: 8,
    }),
    media: {
        maxWidth: '100%',
        height: 'auto',
        padding: 8
    },
});

export default function TripPlannerCard(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles({smDown: matches});

    return(
        <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography className={classes.project} variant="h5" component="h1"
                color= {props.prefersDarkMode ? "textPrimary" : "inherit"}
            >Projects</Typography>
            <Card>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={TripPlanner}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Trip Planner
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Web application for mapping latitude / longitude coordinates and finding the 
                        shortest route. Developed using ReactJS and the surrounding ecosystem. Uses a 
                        Spark Java back-end to provide distance calculation and traveling salesperson 
                        optimization. 
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
                                <IconButton><Code/></IconButton>
                        </Link>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    );
}
