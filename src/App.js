import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import { Container, Tooltip, IconButton, CssBaseline, Box } from '@material-ui/core';
import { Brightness4, BrightnessHigh } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';

import TripPlanner from './components/TripPlanner/TripPlanner';
import Portfolio from './components/Portfolio/Portfolio';

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
    return(
      <Tooltip title="Toggle light/dark theme" aria-label="toggle light/dark theme" leaveDelay={100}>
          <IconButton onClick={() => this.toggleDarkMode()}>
            {this.state.prefersDarkMode ? <BrightnessHigh/> : <Brightness4/>}
          </IconButton>
      </Tooltip>
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <ThemeProvider theme={this.createTheme()}>
        <CssBaseline/>
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
              <Box className={classes.bg}>
                <Container maxWidth="lg">
                  <Portfolio 
                    prefersDarkMode={this.state.prefersDarkMode}
                  />
                </Container>
              </Box>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(App);
