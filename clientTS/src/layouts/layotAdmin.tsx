import React from 'react'; //, { ReactNode, Component }
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
//import Typography from '@material-ui/core/Typography';
//import { layoutType } from './../model/types';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { green, lightGreen } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

const styles = {
    content:{
        margin: 50
    }
};

const themeOptions: ThemeOptions = {
    palette: {
        type: 'light',
        primary: lightGreen,
        secondary: green,
    },

};
const theme = createMuiTheme(themeOptions);

export default function layout(children: JSX.Element): JSX.Element {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar position="static" >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <EditIcon />
                        </IconButton>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            <div style={ styles.content}>
                {children}
            </div>
        </div>
    );
}
