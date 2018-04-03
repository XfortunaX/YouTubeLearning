import Transport from '../modules/network/transport';

const tt = new Transport();

export default class VideosModel {

  constructor() {
    if (VideosModel.instance) {
      return VideosModel.instance;
    }
    this.videos = {};
    VideosModel.instance = this;
  }
  setData(data) {
    this.videos.data = data;
  }
  getData() {
    return this.videos.data;
  }
  getVideos() {
    let headers = {};
    let self = this;
    return tt.get('lessons/categories/', headers)
      .then( (data) => {
        if (data !== false) {
          self.setData(data);
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
