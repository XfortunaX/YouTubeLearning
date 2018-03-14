import Transport from '../modules/network/transport';

const tt = new Transport();

export default class VideoModel {

  constructor() {
    if (VideoModel.instance) {
      return VideoModel.instance;
    }
    this.video = {
      id: 'zjaz2mC1KhM',
      currentSub: 1,
      modifySubs: []
    };
    VideoModel.instance = this;
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
    const self = this;
    return tt.get('video/' + this.video.id, {})
      .then( (data) => {
        self.video.modifySubs = data.final_subs;
      })
      .catch( (error) => {
        console.log('Request failed', error);
      });
  }
}
