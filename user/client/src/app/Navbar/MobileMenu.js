import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, ListItem, List, IconButton, Divider } from '@material-ui/core';
import { ChevronLeft, ChevronRight, AccountCircleRounded } from '@material-ui/icons';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
}));

const MobileMenu = ({ left, toggleDrawer }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={left}
        onClose={toggleDrawer(false)}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={toggleDrawer(false)}>
              {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </div>
          <div className="nav-user">
            <div className="user-info">
              <AccountCircleRounded />
              <div>
                <h4>
                  <b>Văn Văn</b>
                </h4>
                <span>Khách hàng thân thiết</span>
              </div>
            </div>
          </div>
          <Divider />
          <List>
            {['Trang chủ', 'Nam', 'Nữ', 'Phụ kiện', 'Ưu đãi', 'Liên hệ'].map((text, index) => (
              <ListItem button key={text}>
                <Link to={index === 0 ? '/' : '/products'}>{text}</Link>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

MobileMenu.propTypes = {
  left: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default MobileMenu;
