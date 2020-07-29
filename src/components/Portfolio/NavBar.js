import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Container, AppBar, Grid, IconButton, Tooltip, Link, Button,
    ButtonBase, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ContactMail, LinkedIn, GitHub } from '@material-ui/icons';

import HomeB from '../../images/HomeB.png';
import HomeW from '../../images/HomeW.png';
import HomeMobile from '../../images/HomeMobile.png';

const useStyles = makeStyles(theme => ({
    homeButton: {
        margin: theme.spacing(2, 0, 2, 0),
        [theme.breakpoints.up('sm')] : {
            borderRadius: theme.shape.borderRadius
        }
        
    },
    img: {
        height: theme.spacing(4),
        margin: theme.spacing(1),
        [theme.breakpoints.up('sm')] : {
            margin: theme.spacing(0.25)
        }
    }
}));

export default function NavBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));

    const homeButton = (
        <ButtonBase 
            component={RouterLink} to="/"
            centerRipple = {!smUp} focusRipple 
            className={classes.homeButton}
        >
            <img 
                className={classes.img} alt="JV" 
                src={smUp ? (props.prefersDarkMode ? HomeW : HomeB) : HomeMobile}
            />
        </ButtonBase>
    );

    const buttons = (
        <Grid container alignItems="center" spacing={1}>
            <Grid item>
                <Button 
                        variant="text" color="inherit" startIcon={<ContactMail/>}
                        component={RouterLink} to="/contact"
                >
                    Contact
                </Button>
            </Grid>
            <Grid item>
                <Tooltip title="LinkedIn Profile" aria-label="linkedin">
                    <Link 
                        href='https://www.linkedin.com/in/jack-visser/' target="_blank" 
                        rel="noopener" component={IconButton} color="inherit"
                    >
                        <LinkedIn/>
                    </Link>
                </Tooltip>
            </Grid>
            <Grid item>
                <Tooltip title="GitHub Profile" aria-label="github">
                    <Link 
                        href='https://github.com/jackv545' target="_blank" 
                        rel="noopener" component={IconButton} color="inherit"
                    >
                        <GitHub/>
                    </Link>
                </Tooltip>
            </Grid>
        </Grid>
    );

    const toolBar = (
        <Grid container alignItems="center" justify="space-between">
            <Grid item>
                {homeButton}
            </Grid>
            <Grid item>
                {buttons}
            </Grid>
        </Grid>
    );

    return(
        <AppBar position="static" color="default">
            <Container maxWidth="lg">
                {toolBar}
            </Container>
        </AppBar>
    );
}
