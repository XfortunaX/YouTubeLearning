import React, { Component } from 'react'
import YouTube from 'react-youtube'
import { Link } from 'react-router'
import './styles.scss'
import VideoModel from '../../models/videoModel'
import { Input, Icon, Button } from 'react-materialize'

export default class Learning extends Component {
  constructor() {
    super();
    this.opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };
    this.video = new VideoModel();
    this.state = {
      timePlay: 0,
      timeStart: 0,
      showSub: false,
      start: false,
      wrongWord: {}
    };
    this.textInput = [];

    this.replay = this.replay.bind(this);
    this.getSubs = this.getSubs.bind(this);
    this.changedWord = this.changedWord.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.searchSub = this.searchSub.bind(this);
   }
  componentDidMount() {
    this.video.getSubs();
    this.refs.youtube.internalPlayer.pauseVideo();
  }
  onPlay(event) {
    this.state.wrongWord = [];
    this.state.v = event.target;
    this.setState({ showSub: false, start: true });
    this.intShow = setInterval(this.searchSub, 10);
    this.state.timePlay = event.target.getCurrentTime();
  }
  onPause(event) {
    this.setState({ timePlay: false });
    console.log('pause', event.target.getCurrentTime());
  }
  replay() {
    this.refs.youtube.internalPlayer.seekTo(this.oneSub.start_time);
    this.refs.youtube.internalPlayer.playVideo();
  }
  getSubs() {
    this.video.getSubs();
  }
  changedWord(e) {
    e.preventDefault();
    console.log(e.target.value, e.target.id);
    if (this.oneSub.words[parseInt(e.target.id)] !== e.target.value) {
      this.state.wrongWord[parseInt(e.target.id)] = false;
    } else {
      this.state.wrongWord[parseInt(e.target.id)] = true;
    }
    this.setState({ showSub: true });
  }
  createSubs() {
    if (this.state.showSub === true) {
      let oneSubText = this.oneSub.subtitle;
      oneSubText = oneSubText.replace(/↵/g, ' ');
      this.oneSub.words.forEach( (word) => {
        oneSubText = oneSubText.replace(word, '_ ')
      })
      oneSubText = oneSubText.replace(/-/g, ' - ');
      oneSubText = oneSubText.replace(/\s\s/g, ' ');
      oneSubText = oneSubText.split(' ');
      let words = this.oneSub.words;
      let pos = -1;
      let self = this;
      this.textInput = [];

      const listItems = oneSubText.map((word, i) => {
        if (word.indexOf('_') < 0) {
          return (
            <div
              key={i.toString()}
              className='word'>
              {word}
            </div>
          )
        } else {
          pos += 1;
          if (self.state.wrongWord[pos] === true) {
            return (
              <div
                key={i.toString()}
                className='word correctly'>
                {words[pos]}
              </div>
            )
          } else if (self.state.wrongWord[pos] === false) {
            return (
              <div
                key={i.toString()}
                className='word wrong'>
                {words[pos]}
              </div>
            )
          } else {
            return (
              <Input
                key={i.toString()}
                id={'' + pos}
                className='word'
                s={words[pos].length}
                size={words[pos].length}
                onBlur={this.changedWord}
                inline={true}
              />
            )
          }
        }
      });
      this.intStop = setInterval(this.stopTime, 10);
      return (
        <div className='subs'>
          {listItems}
        </div>
      )
    } else {
      return (
        <div className='subs'>
        </div>
      )
    }
  }
  stopTime() {
    if (this.state.v.getCurrentTime() >= this.oneSub.end_time) {
      this.refs.youtube.internalPlayer.pauseVideo();
      clearInterval(this.intStop);
    }
  }
  searchSub() {
    this.oneSub = this.video.getSub(this.state.v.getCurrentTime());
    if (this.oneSub !== false) {
      this.setState({
        timeStart: this.state.v.getCurrentTime(),
        showSub: true
      });
      clearInterval(this.intShow);
    }
  }
  render() {
    return (
      <div className='learning-page'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <div className='youtube-video'>
          <YouTube
            ref='youtube'
            videoId='zjaz2mC1KhM'
            opts={this.opts}
            onPlay={this.onPlay}
            onPause={this.onPause}
          />
        </div>
        <div className='subs-menu'>
          {this.createSubs()}
          <div className='replay'>
            <Button onClick={this.replay}>
              <Icon large center>refresh</Icon>
            </Button>
          </div>
        </div>
        {/*<div className='replay'>*/}
          {/*<button className='link' onClick={this.replay}>Replay</button>*/}
        {/*</div>*/}
        {/*<Icon large>refresh</Icon>*/}
        {/*<Button floating large className='red' waves='light' icon='refresh' />*/}
      </div>
    )
  }
}
