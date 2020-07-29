import React, { Component } from 'react';

import ProjectCard from './ProjectCard';

import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    mt2: {
        marginTop: theme.spacing(3)
    }
});

class Portfolio extends Component {
    componentDidMount() {
        document.title = 'Portfolio | Jack Visser';
    }

    render() {
        const { classes } = this.props;

        return(
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography 
                         className={classes.mt2} variant="h5" component="h1"
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
