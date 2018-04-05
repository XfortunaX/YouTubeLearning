import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import Navbar from '../Home/Navbar/index'
import './styles.scss'
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: new UserModel(),
      level: '',
      value: 0,
      edit: false
    };

    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    this.state.user.checkToken();
    this.state.user.refresh(this.checkAuth)
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
          self.state.user.history()
          self.setState({ profile: true, level: self.state.user.getData().profile.level });
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  handleChange(event, value) {
    this.setState({ value });
  }
  handleChangeLevel(event) {
    this.setState({ level: event.target.value, edit: true });
  }
  handleSave() {
    console.log('save');
    this.setState({ edit: false });
  }
  settings() {
    return (
      <Card style={{ padding: 8 * 3 }}>
        <CardContent style={{ padding: 0 }}>
          <Grid container spacing={24} justify={'center'} alignContent={'center'} style={{ width: '100%', margin: 0 }}>
            <Grid item xs={12}>
              <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  Имя пользователя
                </Grid>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  {this.state.user.getData().username}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  Email
                </Grid>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  {this.state.user.getData().email}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  Уровень
                </Grid>
                <Grid item xs={5} style={{ fontSize: 20 }}>
                  <Select
                    value={this.state.level}
                    onChange={this.handleChangeLevel}
                    inputProps={{ name: 'level' }}
                    style={{ width: 150, fontSize: 20 }}
                  >
                    <MenuItem value={'E'} style={{ fontSize: 20 }}>Легко</MenuItem>
                    <MenuItem value={'M'} style={{ fontSize: 20 }}>Средне</MenuItem>
                    <MenuItem value={'H'} style={{ fontSize: 20 }}>Сложно</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            {
              this.state.edit &&
              <Grid item xs={12}>
                <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                  <Grid item xs={4}>
                    <Button style={ styles.buttonContinue } onClick={this.handleSave}>
                      Редактировать
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </CardContent>
      </Card>
    )
  }
  progress() {
    let lessons = [
      {
        date: new Date(),
        video_id: 'FMEk8cHF-OA',
        thumbnail: 'https://img.youtube.com/vi/FMEk8cHF-OA/0.jpg',
        percentTrue: 57,
        percentTotal: 24
      },
      {
        date: new Date(),
        video_id: 'DW1AuOC9TQc',
        thumbnail: 'https://img.youtube.com/vi/DW1AuOC9TQc/0.jpg',
        percentTrue: 78,
        percentTotal: 38
      }
    ];
    let lessonsList = lessons.map( (item, i) => {
      return (
        <ExpansionPanel key={i} style={{ background: 'rgba(227, 242, 253, 1)', marginBottom: 20 }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={8} justify={'center'} alignContent={'center'} alignItems={'center'}>
              <Grid item xs={12} style={{ fontSize: 24, borderBottom: '1px solid', textAlign: 'left', fontStyle: 'italic' }}>
                {item.date.getDay() + '.' + item.date.getMonth() + '.' + item.date.getFullYear()}
              </Grid>
              <Grid item xs={5}>
                <Card style={ styles.videoCard }>
                  <Link to={'/learning/' + item.video_id} style={{ display: 'contents' }}>
                    <img src={item.thumbnail} style={ styles.videoCardImage }/>
                  </Link>
                 </Card>
              </Grid>
              <Grid item xs={3} style={{ position: 'relative' }}>
                <div style={{ fontSize: '1.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                  Пройдено
                </div>
                <div style={ styles.diagramNum }>
                  {item.percentTotal}%
                </div>
                <CircularProgress style={ styles.diagram } variant='static' value={item.percentTotal} />
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={3} style={{ position: 'relative' }}>
                <div style={{ fontSize: '1.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                  Правильно
                </div>
                <div style={ styles.diagramNum }>
                  {item.percentTrue}%
                </div>
                <CircularProgress style={ styles.diagram } variant='static' value={item.percentTrue} />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              Подробности
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    });
    return (
      <Card style={{ padding: 8 * 3 }}>
        <CardContent>
          {lessonsList}
        </CardContent>
      </Card>
    )
  }
  stats() {
    return (
      <Card style={{ padding: 8 * 3 }}>
        <CardContent>
          <Grid container spacing={24} justify={'center'} alignContent={'center'} alignItems={'center'} style={{ width: '100%', margin: 0 }}>
            <Grid item xs={3} style={{ position: 'relative' }}>
              <div style={{ fontSize: '1.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                Пройдено полностью
              </div>
              <div style={ styles.num }>
                {this.state.user.getStats().playTotal}
              </div>
            </Grid>
            <Grid item xs={6} style={{ position: 'relative' }}>
              <div style={{ fontSize: '2.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                Правильно
              </div>
              <div style={ styles.diagramNumTotal }>
                {this.state.user.getStats().totalTrue}%
              </div>
              <CircularProgress style={ styles.diagramTotal } variant='static' value={this.state.user.getStats().totalTrue} />
            </Grid>
            <Grid item xs={3} style={{ position: 'relative' }}>
              <div style={{ fontSize: '1.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                Пройдено из доступных
              </div>
              <div style={ styles.num }>
                {this.state.user.getStats().play}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
  profile() {
    return (
      <Card style={styles.card}>
        <CardContent style={{ padding: 0 }}>
          <Grid container spacing={24} justify={'center'} alignContent={'center'} style={{ width: '100%', margin: 0 }}>
            <Grid item xs={12} style={{ borderBottom: '1px solid', background: 'rgba(238, 238, 238, 1)' }}>
              <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                <Grid item xs={3}>
                  <Button style={ styles.buttonLogout } onClick={this.logout}>
                    Выйти
                  </Button>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4} style={ styles.avatar }>
                  <Avatar
                    alt='profile icon'
                    src='/src/assets/avatar.png'
                    style={{ width: 200, height: 200, margin: 'auto' }}
                  />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={3}>
                  <Link to={'/'}>
                    <Button style={ styles.buttonContinue }>
                      На главную
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <AppBar position='static' color='default' className='bar'>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor='primary'
                  textColor='primary'
                  fullWidth
                >
                  <Tab label='Общее' style={ styles.subTitle }/>
                  <Tab label='История' style={ styles.subTitle }/>
                  <Tab label='Статистика' style={ styles.subTitle }/>
                </Tabs>
              </AppBar>
              {this.state.value === 0 && this.settings()}
              {this.state.value === 1 && this.progress()}
              {this.state.value === 2 && this.stats()}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
  render() {
    return (
      <div className='profile-page'>
        <Navbar profile={true} logout={this.logout}/>
        {this.profile()}
      </div>
    )
  }
}

const styles = {
  card: {
    textAlign: 'center',
    width: '70%',
    minWidth: 700,
    maxWidth: 800,
    margin: 'auto',
    marginTop: 40,
    marginBottom: 60
  },
  subTitle: {
    fontSize: 22
  },
  avatar: {
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  videoCard: {
    display: 'flex',
    padding: 4,
    margin: 10,
    height: 140
  },
  videoCardImage: {
    height: '100%'
  },
  diagram: {
    color: 'rgba(67, 160, 71, 1)',
    width: 120,
    height: 120
  },
  diagramTotal: {
    color: 'rgba(67, 160, 71, 1)',
    width: 240,
    height: 240
  },
  diagramNum: {
    fontSize: '1.6em',
    position: 'absolute',
    fontStyle: 'italic',
    fontWeight: 600,
    left: '35%',
    top: '48%'
  },
  diagramNumTotal: {
    fontSize: '3.5em',
    position: 'absolute',
    fontStyle: 'italic',
    fontWeight: 600,
    left: '34%',
    top: '45%'
  },
  num: {
    fontSize: '3.5em',
    fontStyle: 'italic',
    fontWeight: 600
  },
  buttonLogout: {
    width: '100%',
    background: 'rgba(244, 67, 54, 1)',
    fontSize: '1.3em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  },
  buttonContinue: {
    width: '100%',
    background: 'rgba(121, 134, 203, 1)',
    fontSize: '0.8em',
    borderRadius: 0,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
  }
};
