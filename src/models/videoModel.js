import Transport from '../modules/network/transport';

const tt = new Transport();

export default class VideoModel {

  constructor() {
    if (VideoModel.instance) {
      return VideoModel.instance;
    }
    this.video = {
      id: '',
      currentSub: 1,
      modifySubs: []
    };
    VideoModel.instance = this;
  }
  setId() {
    let id = window.location.href.split('/').reverse()[0];
    this.video.id = id;
  }
  getCurrent() {
    return this.video.currentSub;
  }
  getId() {
    this.setId();
    return this.video.id;
  }
  getSub(time) {
    let ms = this.video.modifySubs;
    for (let i = 0; i < ms.length; i += 1) {
      if (time >= ms[i].start_time && time < ms[i].end_time) {
        this.video.currentSub = i;
        return this.video.modifySubs[this.video.currentSub];
      } else if (time < ms[i].start_time)  {
        return false;
      }
    }
  }
  getSubs() {
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    };
    const self = this;
    return tt.get('api/video/' + this.video.id, headers)
      .then( (data) => {
        // console.log(data);
        self.video.modifySubs = data.final_subs;
        return data;
      })
      .catch( (error) => {
        console.log('Request failed', error);
      });
  }
}
