import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container, Tooltip, IconButton, CssBaseline, Box } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';

import TripPlanner from './components/TripPlanner/TripPlanner';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Portfolio/Contact';
import PageNotFound from './components/PageNotFound';

import background from './images/background.jpg';

const useStyles = () => ({
    bg: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 96px'
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        this.toggleDarkMode = this.toggleDarkMode.bind(this);
        this.darkModeButton = this.darkModeButton.bind(this);

        this.state = {
            prefersDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        };
    }

    createTheme() {
        return createMuiTheme({
            palette: {
                type: this.state.prefersDarkMode ? 'dark' : 'light',
                background: {
                    default: this.state.prefersDarkMode ? '#757575' : '#eeeeee'
                },
                primary: {
                    main: this.state.prefersDarkMode ? '#7986cb' : '#3f51b5'
                }
            }
        });
    }

    toggleDarkMode() {
        this.setState(prevState => ({
            prefersDarkMode: !prevState.prefersDarkMode
        }));
    }

    darkModeButton() {
        return (
            <Tooltip title="Toggle light/dark theme" aria-label="toggle light/dark theme" leaveDelay={100}>
                <IconButton onClick={() => this.toggleDarkMode()}>
                    {this.state.prefersDarkMode ? <BrightnessHigh /> : <Brightness4 />}
                </IconButton>
            </Tooltip>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <ThemeProvider theme={this.createTheme()}>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route exact path="/TripPlanner">
                            <Container maxWidth="md">
                                <TripPlanner
                                    prefersDarkMode={this.state.prefersDarkMode}
                                    darkModeButton={this.darkModeButton}
                                />
                            </Container>
                        </Route>
                        <Route exact path="/contact">
                            <Box className={classes.bg}>
                                <Contact prefersDarkMode={this.state.prefersDarkMode}/>
                            </Box>
                        </Route>
                        <Route exact path="/">
                            <Box className={classes.bg}>
                                <Container maxWidth="lg">
                                    <Portfolio
                                        prefersDarkMode={this.state.prefersDarkMode}
                                    />
                                </Container>
                            </Box>
                        </Route>
                        <Route path="*">
                            <PageNotFound/>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

export default withStyles(useStyles)(App);
