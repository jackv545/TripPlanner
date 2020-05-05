import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.css';

import { Container, Tooltip, IconButton } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import TripPlanner from './components/TripPlanner/TripPlanner';
import Portfolio from './components/Portfolio/Portfolio';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
      }
    });
  }

  toggleDarkMode() {
    this.setState(prevState => ({
      prefersDarkMode: !prevState.prefersDarkMode
    }));
  }

  darkModeButton() {
    return(
      <Tooltip title="Toggle light/dark theme" aria-label="toggle light/dark theme" leaveDelay={100}>
          <IconButton onClick={() => this.toggleDarkMode()}>
            {this.state.prefersDarkMode ? <BrightnessHigh/> : <Brightness4/>}
          </IconButton>
      </Tooltip>
    );
  }

  render() {
    return(
      <ThemeProvider theme={this.createTheme()}>
        <Router>
          <Switch>
            <Route path="/TripPlanner">
              <Container maxWidth="md">
                <TripPlanner 
                  prefersDarkMode={this.state.prefersDarkMode}
                  darkModeButton={this.darkModeButton}
                />
              </Container>
            </Route>
            <Route path="/">
              <Container maxWidth="md">
                <Portfolio prefersDarkMode={this.state.prefersDarkMode}/>
              </Container>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}
