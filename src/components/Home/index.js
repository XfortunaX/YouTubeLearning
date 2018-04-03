import React, { Component } from 'react'
import UserModel from '../../models/userModel'
import VideosModel from '../../models/videosModel'
import './styles.scss'
import Login from './Login/index'
import Signup from './Signup/index'
import Navbar from './Navbar/index'
import Categories from './Categories/index'

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
      openSignup: false
    };

    this.checkAuth = this.checkAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.authClose = this.authClose.bind(this);
    this.login = this.login.bind(this);
  }
  componentWillMount() {
    this.state.user.checkToken();
    this.state.user.refresh(this.checkAuth)
  }
  componentDidMount() {
    let self = this;
    this.state.videos.getVideos()
      .then( data => {
        if (data === false) {
          console.log('failed')
        } else {
          self.setState({ video: true })
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
  checkAuth() {
    let self = this;
    self.state.user.profile()
      .then( data => {
        if (data === false) {
          console.log('failed')
          self.setState({ openLogin: true });
        } else {
          console.log('auth');
          self.setState({ profile: true });
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
        <Signup open={this.state.openSignup} onChange={this.authClose} login={this.login}/>
        <Categories/>
      </div>
    )
  }
}
