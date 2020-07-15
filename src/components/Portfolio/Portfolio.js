import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import TripPlannerCard from './TripPlannerCard';

import { Grid, Paper, Typography, Icon, IconButton, Tooltip, Link, Divider } 
    from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Place, ContactMail, LinkedIn, GitHub } from '@material-ui/icons';

const useStyles = () => ({
    root: {
        marginTop: 16,
        padding: 16
    },
    edu: {
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
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
                                    rel="noopener" component={IconButton}
                                >
                                    <LinkedIn/>
                                </Link>
                            </Tooltip>
                            <Tooltip title="GitHub Profile" aria-label="github">
                                <Link 
                                    href='https://github.com/jackv545' target="_blank" 
                                    rel="noopener" component={IconButton}
                                >
                                        <GitHub/>
                                </Link>
                            </Tooltip>
                            <Link component={RouterLink} to="/contact">
                                <Tooltip title="Contact" aria-label="contact">
                                    <IconButton>
                                        <ContactMail/>
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }

    render() {
        return(
            <Grid container spacing={2}>
                {this.personalCard()}
                <TripPlannerCard prefersDarkMode={this.props.prefersDarkMode}/>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Portfolio);
