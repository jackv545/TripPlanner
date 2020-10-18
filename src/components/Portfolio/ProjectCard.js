import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Tooltip, Grid, 
    Link, Button } from '@material-ui/core';
import { Code } from '@material-ui/icons';

import TripPlannerImg from '../../images/TripPlanner.jpg';
import SnotelImg from '../../images/Snotel.jpg';

const useStyles = makeStyles({
    media: {
        maxWidth: '100%',
        height: 'auto',
        padding: 8,
        borderRadius: '12px'
    }
});

export default function ProjectCard(props) {
    const projects = {
        snotel: {
            img: SnotelImg,
            title: 'Snotel',
            description: `Web dashboard for retrieving US National Water and Climate Center 
                snow telemetry (SNOTEL) data. Developed using ReactJS functional components 
                and hooks. Uses a Spark Java back-end and a PostgreSQL database to manage 
                snowpack information.`,
            demoButton: (
                <Button 
                    variant='outlined' underline="none"
                    component={Link} href="https://www.snotel.jackvisser.com" 
                > 
                    Demo 
                </Button>
            ),
            repoLink: 'https://github.com/jackv545/SnotelAPI'
        },
        tripPlanner: {
            img: TripPlannerImg,
            title: 'Trip Planner',
            description: `Web application for mapping latitude / longitude coordinates and 
                finding the shortest route. Developed using ReactJS and the surrounding 
                ecosystem. Uses a Spark Java back-end to provide distance calculation and 
                traveling salesperson optimization.`,
            demoButton: (
                <Button 
                    variant='outlined' component={RouterLink} to="/trip-planner"
                > 
                    Demo 
                </Button>
            ),
            repoLink: 'https://github.com/jackv545/TripPlanner'
        }
    };

    const classes = useStyles();

    const projectCard = (project) => {
        return (
            <Grid item xs={12} sm={12} md={6}>
                <Card>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={project.img}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {project.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {project.description} 
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Tooltip title="Go to application" aria-label="go to application">
                            {project.demoButton}
                        </Tooltip>
                        <Tooltip title="View source code" aria-label="view source code">
                            <Link 
                                color="inherit" href={project.repoLink}
                                target="_blank" rel="noopener" component={IconButton}
                            >
                                <Code/>
                            </Link>
                        </Tooltip>
                    </CardActions>
                </Card>
            </Grid>
        );
    };

    if(props.project === 'snotel') {
        return(projectCard(projects.snotel));
    } else if (props.project === 'tripPlanner') {
        return(projectCard(projects.tripPlanner));
    } else {
        return null;
    }
}
