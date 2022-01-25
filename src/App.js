import React, { Component } from 'react';

import { Container, Tooltip, IconButton, CssBaseline } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import TripPlanner from './components/TripPlanner';

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
                <CssBaseline />
                <Container maxWidth="md">
                    <TripPlanner
                        prefersDarkMode={this.state.prefersDarkMode}
                        darkModeButton={this.darkModeButton}
                    />
                </Container>
            </ThemeProvider>
        );
    }
}
