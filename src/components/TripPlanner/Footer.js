import React, { Component } from 'react';

import { Paper, Grid, Typography, Link, Button } from '@material-ui/core';
import { GitHub, Web } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import LinkButton from '../LinkButton';

const useStyles = () => ({
    root: {
        paddingTop: 40,
        paddingBottom: 20
    },
    linkButton: {
        textTransform: 'none',
        fontWeight: 'normal'
    },
    header: {
        fontWeight: 500
    },
    topLink: {
        marginTop: 5
    },
    link: {
        marginTop: 2
    }
});

export class Footer extends Component {
    render() {
        const { classes } = this.props;

        return(
            <Paper elevation={0} square={true}>
                <Grid 
                    container className={classes.root} alignItems="flex-start" justify="space-evenly" spacing={2}
                >
                    <Grid item>
                        <Grid container direction="column" justify="flex-start">   
                            <Link 
                                color="inherit" href='https://github.com/jackv545/TripPlanner' 
                                target="_blank" rel="noopener" underline="none"
                            >
                                <Button startIcon={<GitHub/>} className={classes.linkButton}>
                                    Repository
                                </Button>   
                            </Link>
                            <LinkButton to="/" startIcon={<Web/>} className={classes.linkButton}>
                                Jack Visser
                            </LinkButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" justify="flex-start">
                            <Typography className={classes.header}>Mapping</Typography>
                            <Link 
                                color="inherit" variant="body2" className={classes.topLink}
                                href="https://www.openstreetmap.org/" target="_blank" rel="noopener"
                            >
                                OpenStreetMap
                            </Link>
                            <Link 
                                color="inherit" variant="body2" className={classes.link}
                                href="https://www.thunderforest.com/" target="_blank" rel="noopener"
                            >
                                Thunderforest
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(Footer);
