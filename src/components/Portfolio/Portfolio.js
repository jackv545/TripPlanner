import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ProjectCard from './ProjectCard';

import { Grid, Paper, Typography, Icon, IconButton, Tooltip, Link, Divider } 
    from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Place, ContactMail, LinkedIn, GitHub } from '@material-ui/icons';

const useStyles = () => ({
    root: {
        marginTop: 16,
        padding: 16
    },
    mt1: {
        marginTop: 8
    },
    place: {
        marginTop: 16,
        marginBottom: 8
    }
});

class Portfolio extends Component {
    componentDidMount() {
        document.title = 'Portfolio | Jack Visser';
    }

    personalCard() {
        const { classes } = this.props;

        return(
            <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.root}>
                    <Typography align="center" variant="h5" component="h1">
                        Jack Visser
                    </Typography>
                    <Grid 
                        container className={classes.place} spacing={1}
                        direction="row" justify="center" alignItems="center"
                    >
                        <Grid item>
                            <Icon><Place/></Icon>
                        </Grid>
                        <Grid item>
                            <Typography>Fort Collins, CO</Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item>
                            <Tooltip title="LinkedIn Profile" aria-label="linkedin">
                                <Link 
                                    href='https://www.linkedin.com/in/jack-visser/' target="_blank" 
                                    rel="noopener" component={IconButton} color="inherit"
                                >
                                    <LinkedIn/>
                                </Link>
                            </Tooltip>
                            <Tooltip title="GitHub Profile" aria-label="github">
                                <Link 
                                    href='https://github.com/jackv545' target="_blank" 
                                    rel="noopener" component={IconButton} color="inherit"
                                >
                                    <GitHub/>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Contact" aria-label="contact">
                                <RouterLink to="/contact" color="inherit" component={IconButton}>
                                    <ContactMail/>
                                </RouterLink>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;

        return(
            <Grid container spacing={2}>
                {this.personalCard()}
                <Grid item xs={12}>
                    <Typography 
                         className={classes.mt1} variant="h5" component="h1"
                        color= {this.props.prefersDarkMode ? "textPrimary" : "inherit"}
                    >
                        Projects
                    </Typography>
                </Grid>
                <ProjectCard
                    project="snotel" 
                    prefersDarkMode={this.props.prefersDarkMode}
                />
                <ProjectCard
                    project="tripPlanner" 
                    prefersDarkMode={this.props.prefersDarkMode}
                />
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Portfolio);
