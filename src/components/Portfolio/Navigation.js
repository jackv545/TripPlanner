import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Tooltip, Link } from '@material-ui/core';
import { LinkedIn } from '@material-ui/icons';

export default class Navigation extends Component {
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
                                <Link href='https://www.linkedin.com/in/jack-visser/' target="_blank" rel="noopener">
                                        <IconButton><LinkedIn/></IconButton>
                                </Link>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}
