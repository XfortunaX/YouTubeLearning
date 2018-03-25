import { API_URL } from '../../constants/index';

export default class Transport {

  constructor() {
    if (Transport.instance) {
      return Transport.instance;
    }
    Transport.instance = this;
  }
  post(request, data, headers) {
    return fetch(API_URL + request, {
      credentials: 'include',
      method: 'POST',
      body: data,
      headers: headers
    })
      .then( (response) => {
        if (response.status !== 200) {
          return false;
        }
        return response.json();
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      })
  }
  get(request, headers) {
    return fetch(API_URL + request, {
      credentials: 'include',
      method: 'GET',
      headers: headers
    })
      .then( (response) => {
        return response.json();
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      })
  }
}
