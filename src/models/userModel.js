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
  setData(data) {
    this.user.nickname = data.displayName;
    this.user.email = data.email;
    this.user.isAuthorised = true;
  }
  logout() {
    localStorage.clear();
    this.user = {
      isAuthorised: false,
      nickname: '',
      email: ''
    };
  }
  login(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    const self = this;
    return tt.post('login', data, headers)
      .then(function (data) {
        if (data !== false) {
          self.setData(data);
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
  signup(data) {
    let headers = {
      'Content-type': 'application/json'
    };
    return tt.post('user', data, headers)
      .then(function (data) {
        if (data !== false) {
          return true;
        }
        return false;
      })
      .catch(function (error) {
        console.log('Request failed', error);
        return false;
      });
  }
}
