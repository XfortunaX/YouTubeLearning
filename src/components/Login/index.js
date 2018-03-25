import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'
import { Input, Row, Col } from 'react-materialize'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      checkAuth: false,
      user: new UserModel(),
      validationError: false
    };
    this.inputData = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validationField = this.validationField.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    this.state.user.login({
      username: this.inputData.username.state.value,
      password: this.inputData.password.state.value
    })
      .then( data => {
        if (data === false) {
          self.setState({ validationError: true })
        } else {
          console.log('login');
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  handleChange(e) {
    e.preventDefault();
    if (this.state.validationError === true) {
      this.setState({ validationError: false })
    }
  }
  validationField() {
    if (this.state.validationError === true) {
      return (
        <Col  s={6} offset={'s3'} className='validation__error'>
          Ошибка соединения
        </Col>
      )
    }
  }
  render() {
    return (
      <div className='login-page'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='login-form__title'>
            Авторизация
          </div>
          <Row className='input__form'>
            {this.validationField()}
            <Col s={6} offset={'s3'}>
              <Input
                className='input__text'
                label='Username'
                ref={(input) => { this.inputData.username = input; }}
                onChange={this.handleChange}
              />
            </Col>
            <Col s={6} offset={'s3'}>
              <Input
                className='input__text'
                type='password'
                label='password'
                ref={(input) => { this.inputData.password = input; }}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <div className='login-btn'>
            <button className='link' type='submit'>Войти</button>
          </div>
        </form>
      </div>
    )
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};