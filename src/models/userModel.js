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
    // console.log(this.user);
    return this.user;
  }
  getStats() {
    return {
      totalTrue: 67,
      play: 2,
      playTotal: 0
    }
  }
  checkToken() {
    if (localStorage.getItem('access')) {
      this.user.refresh = localStorage.getItem('refresh');
      this.user.access = localStorage.getItem('access');
      return true;
    } else if (localStorage.getItem('refresh')) {
      this.user.refresh = localStorage.getItem('refresh');
      return true;
    } else {
      return false;
    }
  }
  setToken(data) {
    this.user.isAuthorised = true;
    this.user.refresh = data.refresh;
    this.user.access = data.access;
    localStorage.setItem('refresh', data.refresh);
    localStorage.setItem('access', data.access);
  }
  setData(data) {
    this.user.isAuthorised = true;
    this.user.username = data.username;
    this.user.email = data.email;
    this.user.id = data.id;
  }
  setProfile(data) {
    this.user.isAuthorised = true;
    this.user.email = data.email;
    this.user.username = data.username;
    this.user.profile = data.profile;
  }
  setHistory(data) {
   this.user.history = data;
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
    return tt.post('auth/token/', JSON.stringify(data), headers)
      .then( (data) => {
        if (data !== false) {
          // console.log(data);
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
    // console.log(data);
    return tt.post('auth/signup/', JSON.stringify(data), headers)
      .then( (data) => {
        // console.log(data);
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
  profile() {
    let headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.user.access
    };
    const self = this;
    return tt.get('user/profile/', headers)
      .then( (data) => {
        if (typeof data !== 'number') {
          self.setProfile(data);
          // console.log(data);
          return true;
        }
        return false;
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      });
  }
  refresh(auth) {
    if (this.user.refresh) {
      let headers = {
        'Content-type': 'application/json'
      };
      const self = this;
      console.log('refresh');
      return tt.post('auth/token/refresh/', JSON.stringify({ refresh: this.user.refresh }), headers)
        .then((data) => {
          if (data !== false) {
            // console.log(data);
            self.setToken(data);
            auth();
          }
        })
    } else {
      auth();
    }
  }
  history() {
    let headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.user.access
    };
    const self = this;
    return tt.get('history/', headers)
      .then( (data) => {
        if (typeof data !== 'number') {
          self.setHistory(data);
          // console.log(data);
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
