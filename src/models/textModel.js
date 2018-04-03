import Transport from '../modules/network/transport';

const tt = new Transport();

export default class TextModel {

  constructor() {
    if (TextModel.instance) {
      return TextModel.instance;
    }
    this.text = {
      subs: [],
      words: []
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
  sendResult() {
    let headers = {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access')
    };
    // console.log(JSON.stringify(this.text.text));
    return tt.post('result/', JSON.stringify(this.text.text), headers)
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
}
