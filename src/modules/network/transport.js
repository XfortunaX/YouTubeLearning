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
      method: 'POST',
      body: data,
      headers: headers,
      mode: 'cors'
    })
      .then( (response) => {
        // console.log(response);
        if (response.status !== 200 && response.status !== 201) {
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
      method: 'GET',
      headers: headers,
      mode: 'cors'
    })
      .then( (response) => {
        // console.log(response);
        if (response.status !== 200 && response.status !== 201) {
          return response.status;
        }
        return response.json();
      })
      .catch( (error) => {
        console.log('Request failed', error);
        return false;
      })
  }
}
