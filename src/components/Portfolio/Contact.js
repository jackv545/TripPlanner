import React, { useState, useEffect } from 'react';

import { Container, Paper, Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Home } from '@material-ui/icons';

import LinkButton from '../LinkButton';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2)
    },
    button: {
        textTransform: 'none'
    }, 
    successMessage: {
        marginTop: theme.spacing(2)
    }
}));

export default function Contact(props) {
    useEffect(() => {
        document.title = 'Contact | Jack Visser';
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = e => {
        const encode = (data) => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        const content = {
            name: name, email: email, message: message
        };

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...content })
        })
            .then(() => setSubmitted(true))
            .catch(error => console.error(error));

        e.preventDefault();
    };

    useEffect(() => {
        const regex = /^\S+@\S+$/;
        setEmailValid(regex.test(email));
    }, [email]);

    const classes = useStyles();

    const form = () => {
        const emailInputError = email === '' ? false : !emailValid;

        const formProps = (name) => {
            return {
                fullWidth: true, name: name,
                label: name.charAt(0).toUpperCase().concat(name.slice(1)), 
                variant: 'outlined', color: 'primary'
            }
        };

        return(
            <form onSubmit={handleSubmit} name="contact">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="h1">
                            Contact
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            {...formProps('name')} value={name} 
                            onChange={e => setName(e.target.value)}
                        />
                        
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            {...formProps('email')} 
                            error={emailInputError} value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            {...formProps('message')} 
                            multiline rows={4} value={message} 
                            onChange={e => setMessage(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" color="primary" className={classes.button}
                            type="submit" disabled={!emailValid || message === ''}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };

    const successMessage = (
        <Grid container direction="column" spacing={1} className={classes.successMessage}>
            <Grid item>
                <Typography>
                    Thanks for getting in touch. 
                </Typography>
            </Grid>
            <Grid item>
                <LinkButton startIcon={<Home/>} className={classes.button} variant="outlined" to="/">
                    Go Back
                </LinkButton>
            </Grid>
        </Grid>
        
    );

    return(
        <Container maxWidth="md" className={classes.container}>
            <Paper className={classes.paper}>
                {submitted ? successMessage : form()}
            </Paper>
        </Container>
    );
}
