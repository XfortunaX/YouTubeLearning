import Transport from '../modules/network/transport';

const tt = new Transport();

export default class UserModel {

  constructor() {
    if (UserModel.instance) {
      return UserModel.instance;
    }
    this.user = {
      isAuthorised: false
    };
    UserModel.instance = this;
  }
  isAuthorised() {
    return this.user.isAuthorised;
  }
  getData() {
    return this.user;
  }
  setToken(data) {
    this.isAuthorised = true;
    this.refresh = data.refresh;
    this.success = data.success;
  }
  setData(data) {
    this.isAuthorised = true;
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.id = data.id;
  }
  logout() {
    localStorage.clear();
    this.user = {
      isAuthorised: false,
      id: '',
      username: '',
      email: '',
      refresh: '',
      success: ''
    };
  }
  login(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    const self = this;
    return tt.post('auth/token/', data, headers)
      .then( (data) => {
        if (data !== false) {
          self.setToken(data);
          return true;
        }
        return false;
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      });
  }
  signup(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('auth/signup/', data, headers)
      .then( (data) => {
        if (data !== false) {
          return true;
        }
        return false;
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      });
  }
}
