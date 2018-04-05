import React, { Component } from 'react'
import UserModel from '../../../models/userModel'
import './styles.scss'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';

export default class Signup extends Component {
  constructor(props) {
    super();
    this.state = {
      user: new UserModel(),
      open: props.open,
      onChange: props.onChange,
      login: props.login,
      errorAuth: false,
      errorText: '',
      type: 'signup'
    };
    this.inputData = {};

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.errorField = this.errorField.bind(this);
  }
  componentWillReceiveProps(props) {
    this.setState({ open: props.open })
  }
  handleClick() {
    this.setState({ open: false });
    this.state.onChange();
  }
  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    console.log(
      this.inputData.username.value,
      this.inputData.email.value,
      this.inputData.password.value,
      this.inputData.repeatPassword.value
    );
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.inputData.username.value === '') {
      this.setState({ errorAuth: true, errorText: 'Имя пользователя должно быть заполнено' });
    } else if (!reg.test(this.inputData.email.value)) {
      this.setState({ errorAuth: true, errorText: 'Некорректный email' });
    } else if (this.inputData.password.value.length < 8 ) {
      this.setState({ errorAuth: true, errorText: 'Пароль должен быть больше 7 символов' });
    } else if (this.inputData.password.value !== this.inputData.repeatPassword.value) {
      this.setState({ errorAuth: true, errorText: 'Пароли не совпадают' });
    } else {
      this.state.user.signup({
        username: this.inputData.username.value,
        email: this.inputData.email.value,
        password: this.inputData.password.value
      })
        .then( data => {
          if (data === false) {
            self.setState({ errorAuth: true, errorText: 'Ошибка' })
          } else {
            self.handleClick();
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
    if (this.state.errorAuth === true) {
      this.setState({ errorAuth: false })
    }
  }
  errorField() {
    if (this.state.errorAuth === true) {
      return (
        <Grid item xs={12} style={ style.errorAuth }>
          {this.state.errorText}
        </Grid>
      )
    }
  }
  render() {
    return (
      <div className='signup-page'>
        <Dialog
          open={this.state.open}
          disableBackdropClick={true}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' style={ style.dialogTitle }>
            <div className='signup-title' style={ style.dialogTitleText }>
              Регистрация
            </div>
          </DialogTitle>
          <DialogContent
            style={ style.dialogContent }>
            <Grid container spacing={0}>
              {this.errorField()}
              <Grid item xs={12} style={ style.userSignup.username.row }>
                <TextField
                  label='Имя пользователя'
                  style={ style.userSignup.username.field }
                  inputProps={ style.userSignup.username.input }
                  InputLabelProps={ style.userSignup.username.label }
                  inputRef={(input) => { this.inputData.username = input; }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} style={ style.userSignup.email.row }>
                <TextField
                  label='Электронная почта'
                  type='email'
                  helperText={'example@email.com'}
                  style={ style.userSignup.email.field }
                  inputProps={ style.userSignup.email.input }
                  InputLabelProps={ style.userSignup.email.label }
                  FormHelperTextProps={{ style: { fontSize: 13} }}
                  inputRef={(input) => { this.inputData.email = input; }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} style={ style.userSignup.password.row }>
                <TextField
                  label='Пароль'
                  type='password'
                  helperText={'Длина пароля должна быть больше 7 символов'}
                  style={ style.userSignup.password.field }
                  inputProps={ style.userSignup.password.input }
                  InputLabelProps={ style.userSignup.password.label }
                  FormHelperTextProps={{ style: { fontSize: 13} }}
                  inputRef={(input) => { this.inputData.password = input; }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} style={ style.userSignup.repeatPassword.row }>
                <TextField
                  label='Повторите пароль'
                  type='password'
                  helperText={'Длина пароля должна быть больше 7 символов'}
                  style={ style.userSignup.repeatPassword.field}
                  inputProps={ style.userSignup.repeatPassword.input }
                  InputLabelProps={ style.userSignup.repeatPassword.label }
                  FormHelperTextProps={{ style: { fontSize: 13} }}
                  inputRef={(input) => { this.inputData.repeatPassword = input; }}
                  onChange={this.handleChange}
                  required={true}
                />
              </Grid>
              <Grid item xs={12} style={ style.passwordRestore }>
                Забыли пароль?
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions
            style={ style.dialogAction }>
            <Grid container spacing={8} justify='center'>
              <Grid item xs={6}>
                <Button style={ style.buttonLogin } onClick={this.handleClick}>
                  Войти
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button style={ style.buttonSignup } onClick={this.handleSubmit} autoFocus>
                  Зарегистрироваться
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const style = {
  dialogTitle: {
    height: 40,
    borderBottom: '1px solid',
    background: 'rgba(238, 238, 238, 1)'
  },
  dialogTitleText: {
    marginTop: 8,
    paddingBottom: 6,
    fontSize: '1.8em'
  },
  dialogContent: {
    width: 430,
    paddingBottom: 0
  },
  errorAuth: {
    marginTop: 16,
    height: 20,
    fontSize: 18,
    color: 'rgba(229, 57, 53, 1)'
  },
  userSignup: {
    username: {
      row: {
        marginTop: 20,
        height: 50
      },
      field: {
        width: '100%'
      },
      input: {
        style: {
          fontSize: '1.4em'
        }
      },
      label: {
        style: {
          fontSize: '1.3em',
          fontWeight: 400
        }
      }
    },
    email: {
      row: {
        marginTop: 30,
        height: 50
      },
      field: {
        width: '100%'
      },
      input: {
        style: {
          fontSize: '1.4em'
        }
      },
      label: {
        style: {
          fontSize: '1em',
          fontWeight: 400
        }
      }
    },
    password: {
      row: {
        marginTop: 30,
        height: 50
      },
      field: {
        width: '100%'
      },
      input: {
        style: {
          fontSize: '1.4em'
        }
      },
      label: {
        style: {
          fontSize: '1em',
          fontWeight: 400
        }
      }
    },
    repeatPassword: {
      row: {
        marginTop: 30,
        height: 50
      },
      field: {
        width: '100%'
      },
      input: {
        style: {
          fontSize: '1.4em'
        }
      },
      label: {
        style: {
          fontSize: '1em',
          fontWeight: 400
        }
      }
    }
  },
  passwordRestore: {
    marginTop: 35,
    height: 38,
    fontSize: 16,
    fontStyle: 'italic'
  },
  dialogAction: {
    paddingLeft: 20,
    paddingRight: 20,
    margin: 4,
    marginBottom: 15
  },
  buttonSignup: {
    width: '100%',
    background: 'rgba(0, 150, 136, 1)',
    fontSize: '1em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  },
  buttonLogin: {
    width: '100%',
    background: 'rgba(197, 202, 233, 1)',
    fontSize: '1em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  }
};
