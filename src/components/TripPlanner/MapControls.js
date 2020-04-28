import React, { Component } from 'react';
import { Button, Menu, Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';

export function toggleMapOptions(stateVar) {
    let mapOptions = {...this.state.mapOptions};
    mapOptions[stateVar] = !mapOptions[stateVar];
    this.setState({
        mapOptions: mapOptions
    })
}

export default class MapControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null
        };
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        return(
            <>
            <Tooltip title="Edit map options" aria-label="edit map options">
                <Button style={{ 'marginLeft': 1 }} variant='outlined' onClick={this.handleClick}>
                    View
                </Button>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
            >
                {['showRoute', 'showMarkers'].map((stateVar, i) => (
                    <FormControlLabel key={i}
                        control={
                            <Checkbox
                                color='default'
                                checked={this.props.mapOptions[stateVar]}
                                onChange={() => this.props.toggleMapOptions(stateVar)}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        style={{ display: 'block', 'marginLeft': 2 }}
                        label={stateVar.substr(4)}
                    />
                ))}
            </Menu>
            </>
        );
    }
}
