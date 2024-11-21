import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography, Link, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from "react";
import LanguageSwitcher from '../../components/languages/LanguageSwitcher.jsx';
import { useTranslation } from 'react-i18next';

const AppHeader = ({ onMenuItemClick }) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleMenuItemClick = (menuItem) => {
		onMenuItemClick(menuItem);
		handleMenuClose();
	};

	return (
		<AppBar position="fixed" sx={{ backgroundColor: '#232F3E' }}>
			<Toolbar sx={{ width: { xs: 'calc(100% - 120px)', md: '70%' }, marginLeft: { md: '15%' }, marginRight: { md: '15%' }, justifyContent: 'space-between' }}>
				<Typography variant="h6" component="div">
					Qorva
				</Typography>
				<Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, marginLeft: { xs: 1, md: 5 } }}>
					<Link href="#" color="inherit" underline="none" variant="button" onClick={() => handleMenuItemClick('jobs')}>{t('header.jobs')}</Link>
					<Link href="#" color="inherit" underline="none" variant="button" onClick={() => handleMenuItemClick('cvs')}>{t('header.cvs')}</Link>
					<Link href="#" color="inherit" underline="none" variant="button" onClick={() => handleMenuItemClick('screening')}>{t('header.screening')}</Link>
					<Link href="#" color="inherit" underline="none" variant="button" onClick={() => handleMenuItemClick('analytics')}>{t('header.analytics')}</Link>
				</Box>
				<Box sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 0 }}>
					<IconButton color="inherit" onClick={toggleDrawer(true)}>
						<MenuIcon />
					</IconButton>
					<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
						<Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
							<List>
								<ListItem button onClick={() => handleMenuItemClick('jobs')}>
									<ListItemText primary={t('header.jobs')} />
								</ListItem>
								<ListItem button onClick={() => handleMenuItemClick('cvs')}>
									<ListItemText primary={t('header.cvs')} />
								</ListItem>
								<ListItem button onClick={() => handleMenuItemClick('screening')}>
									<ListItemText primary={t('header.screening')} />
								</ListItem>
								<ListItem button onClick={() => handleMenuItemClick('analytics')}>
									<ListItemText primary={t('header.analytics')} />
								</ListItem>
							</List>
						</Box>
					</Drawer>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 2 }}>
					<LanguageSwitcher textColor={'white'} />
					<IconButton onClick={handleMenuOpen} color="inherit">
						<Avatar alt="User Icon" />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
						anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					>
						<MenuItem onClick={() => handleMenuItemClick('accountSettings')}>{t('header.accountSettings')}</MenuItem>
						<MenuItem onClick={() => handleMenuItemClick('logout')}>{t('header.logout')}</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
