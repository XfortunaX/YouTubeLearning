import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'
import { Input, Row, Col } from 'react-materialize'

export default class Signup extends Component {
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
    if (this.inputData.password.state.value === this.inputData.repeatPassword.state.value) {
      this.state.user.signup({
        username: this.inputData.username.state.value,
        email: this.inputData.email.state.value,
        password: this.inputData.password.state.value
      })
        .then( data => {
          if (data === false) {
            self.setState({ validationError: true })
          } else {
            self.state.user.setData(data);
            console.log('signup');
          }
        })
        .catch( () => {
          console.log('failed');
        })
    }
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
      <div className='signup-page'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <form className='signup-form' onSubmit={this.handleSubmit}>
          <div className='signup-form__title'>
            Регистрация
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
                type='email'
                label='Email'
                ref={(input) => { this.inputData.email = input; }}
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
            <Col s={6} offset={'s3'}>
              <Input
                className='input__text'
                type='password'
                label='repeatPassword'
                ref={(input) => { this.inputData.repeatPassword = input; }}
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <div className='signup-btn'>
            <button className='link' type='submit'>Зарегистрироваться</button>
          </div>
        </form>
      </div>
    )
  }
}
