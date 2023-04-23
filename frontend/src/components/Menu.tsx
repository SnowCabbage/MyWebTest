import React from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Avatar, createTheme, ThemeProvider} from "@mui/material";
// import {NavLink} from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#ffb3a7',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
        background: {
            default: "#002884"
        }
    },
});

class Menu  extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        return (
            <div>
                {/*<img*/}
                {/*    className="image-style"*/}
                {/*    src="/dog.jpg"*/}
                {/*    alt="The dog"*/}
                {/*/>*/}
                <Avatar
                    src="dog.jpg"
                    alt="The dog"
                    sx={{width:50, height:50}}
                />
                <ThemeProvider theme={theme}>
                    <Box sx={{ width: 250, maxWidth: 360, bgcolor: 'primary.main'}} >
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="/">
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="/movies">
                                        <ListItemText primary="Movies" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        <Divider />
                    </Box>
                </ThemeProvider>
            </div>
        );
    }
}

export default Menu