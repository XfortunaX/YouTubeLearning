import React, { Component } from 'react'
import YouTube from 'react-youtube'
import './styles.scss'
import VideoModel from '../../models/videoModel'
import TextModel from '../../models/textModel'
import UserModel from '../../models/userModel'
import Navbar from '../Home/Navbar/index'
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import Result from './Result/index'

export default class Learning extends Component {
  constructor() {
    super();
    this.opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    };

    this.video = new VideoModel();
    this.text = new TextModel();

    this.state = {
      user: new UserModel(),
      profile: false,
      start: false,
      timePlay: 0,
      timeStart: 0,
      showSub: false,
      check: false,
      v: '',
      checkSub: [],
      result: false
    };
    this.inputData = {};

    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.replay = this.replay.bind(this);
    this.subActions = this.subActions.bind(this);
    this.handleClickEnd = this.handleClickEnd.bind(this);
    this.handleClickCheck = this.handleClickCheck.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.searchSub = this.searchSub.bind(this);
   }
  componentWillMount() {
    this.state.user.checkToken();
    this.state.user.refresh(this.checkAuth)
  }
  componentDidMount() {
    let self = this;
    this.video.getSubs()
      .then((data) => {
        self.text.setText(data);
      })
  }
  logout() {
    this.state.user.logout();
    window.location.href = '/';
  }
  checkAuth() {
    let self = this;
    self.state.user.profile()
      .then( data => {
        if (data === false) {
          console.log('failed');
          window.location.href = '/';
        } else {
          console.log('auth');
          self.setState({ profile: true });
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  onPlay(event) {
    this.state.v = event.target;
    this.setState({ showSub: false, check: false });
    this.intShow = setInterval(this.searchSub, 10);
    this.state.timePlay = event.target.getCurrentTime();
  }
  onPause(event) {
    this.setState({ timePlay: false, start: false });
    console.log('pause', event.target.getCurrentTime());
  }
  handleClickEnd() {
    this.text.sendResult();
    this.setState({ result: true })
    console.log('end');
  }
  handleClickCheck() {
    let subArray = this.oneSub.subtitle.match(/[,-]|\b[^,-\s]+\b/g);
    let checkWord = this.oneSub.words.join('|');

    let state = '';
    let result = subArray.map( (item, i) => {
      if (item.match(RegExp(checkWord))) {
        if (this.inputData[i.toString()].value.toUpperCase() === item.toUpperCase()) {
          state = 'success';
        } else {
          if (this.inputData[i.toString()].value === '') {
            state = 'miss';
          } else {
            state = 'error';
          }
        }
      } else {
        state = 'base';
      }
      return {
        word: item,
        state: state
      }
    });
    // console.log(this.oneSub, result)
    this.text.subMatch(result, this.video.getCurrent());
    this.setState({ check: true, checkSub: result })
  }
  replay() {
    this.refs.youtube.internalPlayer.seekTo(this.oneSub.start_time);
    this.refs.youtube.internalPlayer.playVideo();
    this.setState({ start: true });
  }
  createSubs() {
    if (this.state.showSub === true) {
      let checkWord = this.oneSub.words.join('|');
      let subText = this.oneSub.subtitle.replace(/↵/g, ' ');
      subText = subText.match(/[,-]|\b[^,-\s]+\b/g);
      let sub = [];

      if (this.state.check === false) {
        sub = subText.map((item, i) => {
          if (item.match(RegExp(checkWord))) {
            return (
              <TextField
                key={i.toString()}
                style={{ width: item.length * 15, marginRight: 15 }}
                inputProps={ styles.wordInput.input }
                inputRef={(input) => { this.inputData[i.toString()] = input; }}
                placeholder={'word'}
              />
            )
          } else {
            return (
              <div
                key={i.toString()}
                style={{ display: 'inline-block', marginRight: 15, fontSize: '1.5em '}}>
                {item}
              </div>
            )
          }
        });
      } else {
        sub = this.state.checkSub.map((item, i) => {
          return (
            <div
              key={i.toString()}
              style={{
                display: 'inline-block',
                marginRight: 15,
                fontSize: '1.5em',
                color: styles.wordInput[item.state + 'FieldColor'].color
              }}>
              {item.word}
            </div>
          )
        });
      }
      return (
        <div className='subs'>
          {sub}
        </div>
      )
    }
  }
  stopTime() {
    if (this.state.v.getCurrentTime() >= this.oneSub.end_time) {
      this.refs.youtube.internalPlayer.pauseVideo();
      clearInterval(this.intStop);
      this.setState({ showSub: true });
    }
  }
  searchSub() {
    this.inputData = {};
    this.oneSub = this.video.getSub(this.state.v.getCurrentTime());
    if (this.oneSub !== false) {
      this.setState({ timeStart: this.state.v.getCurrentTime() });
      clearInterval(this.intShow);
      this.intStop = setInterval(this.stopTime, 10);
    }
  }
  subActions() {
    if (this.state.showSub === true) {
      if (this.state.check === true) {
        return (
          <Grid container spacing={24} justify={'center'} alignItems={'center'} style={ styles.actions }>
            <Grid item xs={4}>
              <Button style={ styles.buttonEnd } onClick={this.handleClickEnd}>
                Завершить
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button style={ styles.buttonReplay } onClick={this.replay}>
                <Icon style={{fontSize: 60, color: 'white'}}>
                  replay
                </Icon>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button style={ styles.buttonCheck } onClick={ () => {
                this.refs.youtube.internalPlayer.playVideo();
                this.setState({ start: true });
              }}>
                Продолжить
              </Button>
            </Grid>
          </Grid>
        )
      } else {
        return (
          <Grid container spacing={24} justify={'center'} alignItems={'center'} style={ styles.actions }>
            <Grid item xs={4}>
              <Button style={ styles.buttonEnd } onClick={this.handleClickEnd}>
                Завершить
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button style={ styles.buttonReplay } onClick={this.replay}>
                <Icon style={{fontSize: 60, color: 'white'}}>
                  replay
                </Icon>
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button style={ styles.buttonCheck } onClick={this.handleClickCheck}>
                Проверить
              </Button>
            </Grid>
          </Grid>
        )
      }
    } else {
      return (
        <Grid container spacing={24} justify={'center'} alignItems={'center'} style={ styles.actions }>
          <Grid item xs={4}>
            <Button style={ styles.buttonEnd } onClick={this.handleClickEnd}>
              Завершить
            </Button>
          </Grid>
          {
            !this.state.start &&
            <Grid item xs={4}>
              <Button style={ styles.buttonCheck } onClick={ () => {
                this.refs.youtube.internalPlayer.playVideo();
                this.setState({ start: true });
              }}>
                Воспроизвести
              </Button>
            </Grid>
          }
        </Grid>
      )
    }
  }
  card() {
    if (this.state.result === false) {
      return (
        <Card style={styles.card}>
          <div style={styles.youTube}>
            <YouTube
              ref='youtube'
              videoId={this.video.getId()}
              opts={this.opts}
              onPlay={this.onPlay}
              onPause={this.onPause}
            />
          </div>
          <CardContent>
            <Grid container spacing={0} justify={'center'} alignItems={'center'} style={ styles.subs }>
              <Grid item xs={10}>
                {this.createSubs()}
              </Grid>
            </Grid>
            {this.subActions()}
          </CardContent>
        </Card>
      )
    } else {
      return (
        <Result />
      )
    }
  }
  render() {
    return (
      <div className='learning-page'>
        <Navbar profile={this.state.profile} logout={this.logout}/>
        {this.card()}
      </div>
    )
  }
}

const styles = {
  card: {
    textAlign: 'center',
    width: '60%',
    minWidth: 700,
    maxWidth: 800,
    margin: 'auto',
    marginTop: 40,
    marginBottom: 60
  },
  youTube: {
    padding: 12,
    borderBottom: '1px solid',
    background: 'rgba(224, 224, 224, 1)'
  },
  wordInput: {
    field: {
      width: 75,
      marginRight: 15
    },
    baseFieldColor: {
      color: 'rgba(33, 33, 33, 1)'
    },
    missFieldColor: {
      color: 'rgba(189, 189, 189, 1)'
    },
    successFieldColor: {
      color: 'rgba(56, 142, 60, 1)'
    },
    errorFieldColor: {
      color: 'rgba(211, 47, 47, 1)'
    },
    input: {
      style: {
        textAlign: 'center',
        fontSize: '1.4em'
      }
    }
  },
  subs: {
    margingTop: 10
  },
  actions: {
    marginTop: 20
  },
  buttonReplay: {
    width: 90,
    height: 90,
    background: 'rgba(79, 195, 247, 1)',
    borderRadius: 45,
    padding: 0
  },
  buttonEnd: {
    width: '100%',
    background: 'rgba(244, 67, 54, 1)',
    fontSize: '1.3em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  },
  buttonCheck: {
    width: '100%',
    background: 'rgba(0, 150, 136, 1)',
    fontSize: '1.3em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  }
};
