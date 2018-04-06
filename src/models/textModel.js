import Transport from '../modules/network/transport';

const tt = new Transport();

export default class TextModel {

  constructor() {
    if (TextModel.instance) {
      return TextModel.instance;
    }
    this.text = {
      subs: [],
      words: [],
      text: []
    };
    TextModel.instance = this;
  }
  refresh() {
    this.text = {
      subs: [],
      words: []
    };
  }
  setText(data) {
    this.text.subs = data.final_subs.map( (item) => {
      return item.subtitle;
    });
    this.text.text = this.text.subs.map( (item) => {
      let subArray = item.match(/[,-]|\b[^,-\s]+\b/g);
      let result = subArray.map((word) => {
        return {
          word: word,
          state: 'miss'
        }
      });
      return result
    });
  }
  subMatch(sub, subId) {
    this.text.subs[subId] = sub;
    this.text.text[subId] = sub;
  }
  getText() {
    return this.text.text;
  }
  sendResult(id) {
    let headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    };
    console.log(id);
    return tt.post('history/', JSON.stringify({
      video_id2: id,
      json_data: this.text.text }), headers)
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
  getOne(id) {
    let headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    };
    const self = this;
    return tt.get('history/' + id, headers)
      .then( (data) => {
        if (typeof data !== 'number') {
          // self.setProfile(data);
          self.text.text = data.json_data;
          console.log(data);
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
