import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: new UserModel()
    }
  }
  profileData() {
    return (
      <div className='nickname'>
        Никнейм:&nbsp;&nbsp;&nbsp;&nbsp; {this.state.user.getData().nickname}
      </div>
    )
  }
  render() {
    return (
      <div className='profile-page'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <div className='main'>
          <div className='profile-title'>
            Профиль
          </div>
          {this.profileData()}
        </div>
      </div>
    )
  }
}