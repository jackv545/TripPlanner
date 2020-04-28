import React, { Component } from 'react';

import { Collapse, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

export function toggleError() {
    this.setState(prevState => ({
        latlngError: !prevState.latlngError
      }));
}

export default class LatLngError extends Component {
    render() {
        return(
            <Collapse in={this.props.latlngError}>
                <Alert
                    severity = "error"
                    action = {
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => { this.props.toggleError() }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Invalid Coordinates
                </Alert>    
            </Collapse>
        );
    }
}
