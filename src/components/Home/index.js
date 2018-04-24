import React, { Component } from 'react'
import UserModel from '../../models/userModel'
import VideosModel from '../../models/videosModel'
import './styles.scss'
import Login from './Login/index'
import Signup from './Signup/index'
import Navbar from './Navbar/index'
import Categories from './Categories/index'
import Snackbar from 'material-ui/Snackbar'


export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      profile: false,
      video: false,
      user: new UserModel(),
      videos: new VideosModel(),
      openLogin: false,
      openSignup: false,
      openSnack: false
    };

    this.checkAuth = this.checkAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.authClose = this.authClose.bind(this);
    this.login = this.login.bind(this);
    this.snack = this.snack.bind(this);
  }
  componentWillMount() {
    this.state.user.checkToken();
    this.state.user.refresh(this.checkAuth);
  }
  componentDidMount() {
    let self = this;
    this.state.videos.getVideos()
      .then( data => {
        if (data === false) {
          console.log('failed')
        } else {
          self.setState({ video: true });
          console.log('getVideos');
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  componentWillReceiveProps(props) {
    if (props.profile === false && props.openLogin === false && props.openSignup === false) {
      this.checkAuth();
    }
  }
  snack() {
    console.log('openSnack');
    this.setState({openSnack: true})
  }
  checkAuth() {
    let self = this;
    self.state.user.profile()
      .then( data => {
        if (data === false) {
          console.log('failed')
          self.setState({ openLogin: true });
        } else {
          console.log('auth');
          self.setState({profile: true, auth: true});
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  logout() {
    this.state.user.logout();
    this.setState({ auth: false, profile: false, openLogin: true });
  }
  authClose() {
    if (this.state.openLogin === true) {
      this.setState({ openLogin: false, openSignup: true });
    } else {
      this.setState({ openLogin: true, openSignup: false });
    }
  }
  login() {
    this.setState({ auth: true, openLogin: false, openSignup: false });
    this.checkAuth();
  }
  render() {
    return (
      <div className='home-page'>
        <Navbar profile={this.state.profile} logout={this.logout}/>
        <Login open={this.state.openLogin} onChange={this.authClose} login={this.login} />
        <Signup open={this.state.openSignup} openSnack={this.snack} onChange={this.authClose} login={this.login}/>
        {
          this.state.auth &&
          <Categories/>
        }
        <Snackbar
          style={{width: 400}}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={this.state.openSnack}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ openSnack: false });
          }}
          SnackbarContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span style={{fontSize: 20}} id='message-id'>Регистрация прошла успешно</span>}
        />
      </div>
    )
  }
}
