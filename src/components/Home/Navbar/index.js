import React, { Component } from 'react'
import UserModel from '../../../models/userModel'
import { Link } from 'react-router'
import './styles.scss'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AccountCircle from 'material-ui-icons/AccountCircle';
import Grid from 'material-ui/Grid';
import ArrorDropDown from 'material-ui-icons/ArrowDropDown'
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

export default class Navbar extends Component {
  constructor(props) {
    super();
    this.state = {
      profile: props.profile,
      logout: props.logout,
      user: new UserModel(),
      anchorEl: null
    };

    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ profile: props.profile })
  }
  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  }
  handleClose () {
    this.setState({ anchorEl: null });
  }
  logout() {
    this.handleClose();
    this.state.logout();
  }
  profile() {
    if (this.state.profile) {
      return (
        <div>
          <Button
            aria-owns={this.state.anchorEl ? 'simple-menu' : null}
            aria-haspopup='true'
            onClick={this.handleClick}
          >
            <Grid container spacing={8} justify={'center'} alignContent={'center'} alignItems={'center'} style={ styles.profile }>
              <Grid item xs={3} style={ styles.profileInfo.avatar }>
                <AccountCircle style={ styles.profileInfo.avatarIcon }/>
              </Grid>
              <Grid item xs={6} style={ styles.profileInfo.username }>
                { this.state.user.getData().username }
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'center' }}>
                  <ArrorDropDown/>
              </Grid>
            </Grid>
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
            style={{ marginTop: 48, marginLeft: 5 }}
          >
            <Link to={'/profile'} style={{ textUnderline: 'none' }}>
              <MenuItem onClick={this.handleClose} style={ styles.profileActions }>
                  Профиль
              </MenuItem>
            </Link>
            <MenuItem onClick={this.logout} style={ styles.profileActions }>Выйти</MenuItem>
          </Menu>
        </div>
      )
    }
  }
  render() {
    return (
      <div style={ styles.root }>
        <AppBar position='static' color='default'>
          <Toolbar>
            <Grid container spacing={24} justify={'center'} alignContent={'center'} alignItems={'center'}>
              <Typography variant='title' color='inherit' style={ styles.title }>
                YouTube Learning
              </Typography>
              {this.profile()}
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const styles = {
  navbar: {
    height: 90
  },
  root: {
    flex: 1
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: '3em',
    fontStyle: 'italic',
    fontFamily: 'Lobster'
  },
  profile: {
    width: 220
  },
  profileActions: {
    textUnderline: 'none',
    fontSize: 20,
    width: 200
  },
  profileInfo: {
    field: {
      alignContent: 'flex-end'
    },
    username: {
      textAlign: 'center',
      fontSize: 20
    },
    level: {
      marginTop: 4,
      borderTop: '1px solid',
      borderRight: '1px solid',
      textAlign: 'center',
      fontSize: 18
    },
    statistic: {
      marginTop: 4,
      borderTop: '1px solid',
      textAlign: 'center',
      fontSize: 18
    },
    avatar: {
      textAlign: 'center'
    },
    avatarIcon: {
      height: 50,
      width: 50
    }
  }
};
