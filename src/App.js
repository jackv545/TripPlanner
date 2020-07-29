import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Container, Tooltip, IconButton, CssBaseline } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import TripPlanner from './components/TripPlanner/TripPlanner';
import Portfolio from './components/Portfolio/Portfolio';
import NavBar from './components/Portfolio/NavBar';
import Contact from './components/Portfolio/Contact';
import PageNotFound from './components/PageNotFound';

export default class App extends Component {
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
                    paper: this.state.prefersDarkMode ? '#212121' : '#fff',
                    default: this.state.prefersDarkMode ? '#121212' : '#eeeeee'
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
        return (
            <ThemeProvider theme={this.createTheme()}>
                <CssBaseline/>
                <Router>
                    <Switch>
                        <Route exact path="/trip-planner">
                            <Container maxWidth="md">
                                <TripPlanner
                                    prefersDarkMode={this.state.prefersDarkMode}
                                    darkModeButton={this.darkModeButton}
                                />
                            </Container>
                        </Route>
                        <Route path="/">
                            <NavBar prefersDarkMode={this.state.prefersDarkMode}/>
                            <Switch>
                                <Route exact path="/">
                                    <Container maxWidth="lg">
                                        <Portfolio
                                            prefersDarkMode={this.state.prefersDarkMode}
                                        />
                                    </Container>
                                </Route>
                                <Route exact path="/contact">
                                    <Contact prefersDarkMode={this.state.prefersDarkMode}/>
                                </Route>
                                <Route path="*">
                                    <PageNotFound/>
                                </Route>
                            </Switch>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}
