import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/DashboardCustomizeSharp';
import Toolbar from '@mui/material/Toolbar';
import { Router, Switch, Route, Redirect, useRouteMatch, Link, useHistory } from 'react-router-dom';
import Home from '../Home/Home';
import Product from '../Product/Product';
import ConstantHelper from '../../Helper/ConstantHelper';

const drawerWidth = 240;

function Dashboard(props) {
    const { window1 } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectTab, setSelectTab] = React.useState(0);
    const history = useHistory()
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        if (!localStorage.getItem('isLogin')) {
            history.push('/')
        }
    }, [])

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem onClick={() => { setSelectTab(0); history.push('/app') }} selected={window.location.pathname === '/app'} button key={ConstantHelper.homeTitle}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary={ConstantHelper.homeTitle} />
                </ListItem>
                <ListItem onClick={() => { setSelectTab(1); history.push('/app/product') }} selected={window.location.pathname === '/app/product'} button key={ConstantHelper.productTitle}>
                    <ListItemIcon>
                        <MailIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary={ConstantHelper.productTitle} />
                </ListItem>
                <ListItem onClick={() => { localStorage.clear(); history.push('/') }} selected={2 === selectTab} button key={ConstantHelper.logoutTitle}>
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'white' }} primary={ConstantHelper.logoutTitle} />
                </ListItem>
            </List>
        </div>
    );

    const container = window1 !== undefined ? () => window1().document.body : undefined;
    let { path, url } = useRouteMatch();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#142534" },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#142534" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Route exact path={path}>
                <Home />
            </Route>
            <Route exact path={`${path}/product`}>
                <Product />
            </Route>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window1: PropTypes.func,
};

export default Dashboard;
