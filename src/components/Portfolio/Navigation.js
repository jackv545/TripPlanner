import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Tooltip } from '@material-ui/core';
import { LinkedIn } from '@material-ui/icons';

export default class Navigation extends Component {
    github() {
        window.open('https://github.com/jackv545', '_blank');
    }

    render() {
        return(
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Grid container justify="space-between" alignItems="baseline">
                        <Grid item>
                            <Typography 
                                color= {this.props.prefersDarkMode ? "textPrimary" : "inherit"} 
                                variant="h6">
                                    Jack Visser | Portfolio
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="LinkedIn" aria-label="linkedin">
                                <IconButton  
                                    onClick={() => window.open('https://www.linkedin.com/in/jack-visser/', '_blank')}
                                >
                                    <LinkedIn/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
