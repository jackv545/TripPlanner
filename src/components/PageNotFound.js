import React from 'react';

import { Box, Divider, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    message: {
        width: '100%',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)'
    }
})

export default function PageNotFound(props) {
    React.useEffect(() => {
        document.title = '404: Page not found';
    }, []);

    const classes = useStyles();

    return(
        <Box >
            <Grid 
                container justify="center" className={classes.message}
                alignItems="center" spacing={3}
            >
                <Grid item>
                    <Typography variant="h6" component="h1">
                        404
                    </Typography>
                </Grid>
                <Divider flexItem={true} orientation="vertical"/>
                <Grid item>
                    <Typography variant="body2">
                        This page could not be found.
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
