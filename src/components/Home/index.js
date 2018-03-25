import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import VideosModel from '../../models/videosModel'
import './styles.scss'
import { Collapsible, CollapsibleItem, Row, Col } from 'react-materialize'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      checkAuth: false,
      user: new UserModel(),
      videos: new VideosModel()
    };
    this.handleClick = this.handleClick.bind(this);
    this.LessonsCategories = this.LessonsCategories.bind(this);
  }
  componentDidMount() {
    this.state.videos.getVideos()
      .then( data => {
        if (data === false) {
          console.log('failed')
        } else {
          console.log('getVideos');
        }
      })
      .catch( () => {
        console.log('failed');
      })
  }
  handleClick(e) {
    e.preventDefault();
    this.state.user.logout();
    this.forceUpdate();
  }
  Profile() {
    const isLogged = this.state.user.isAuthorised();
    if (isLogged) {
      return (
        <div className='head'>
          <div className='auth'>
            <div className='userNickname'>{ this.state.user.getData().username }</div>
            <div className='userActions'>
              <div className='toProfile'>
                <Link className='link' to='/profile'>Профиль</Link>
              </div>
              <div className='toLogout'>
                <Link className='link' to='/' onClick={ this.handleClick }>Выйти</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='head'>
        <div className='notAuth'>
          <div className='userNickname'>Вы не авторизованы!</div>
          <div className='userActions'>
            <div className='toLogin'>
              <Link className='link' to='/login'>Войти</Link>
            </div>
            <div className='toSignUp'>
              <Link className='link' to='/signup'>Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  Menu() {
    return (
      <div className='main'>
        <div className='name'>
          YouTube &nbsp;&nbsp;Learning
        </div>
        <div className='menu'>
          {/*<div className='menu-item'>*/}
            {/*<Link className='link' to='/learning'>К просмотру!</Link>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
  LessonsCategories() {
    let self = this;
    let videosData = [
      {
        'id': 1,
        'videos': [
          {
            'id': 1,
            'lesson': 'First Lesson',
            'thumbnail': 'https://img.youtube.com/vi/_ZLXKt4L-AA/1.jpg',
            'video_id': '_ZLXKt4L-AA'
          },
          {
            'id': 2,
            'lesson': 'First Lesson',
            'thumbnail': 'https://img.youtube.com/vi/4h0uC9FPVMQ/1.jpg',
            'video_id': '4h0uC9FPVMQ'
          },
          {
            'id': 3,
            'lesson': 'First Lesson',
            'thumbnail': 'https://img.youtube.com/vi/4h0uC9FPVMQ/1.jpg',
            'video_id': '4h0uC9FPVMQ'
          }
        ],
        'name': 'First Lesson'
      },
      {
        'id': 2,
        'videos': [
          {
            'id': 1,
            'lesson': 'Second Lesson',
            'thumbnail': 'https://img.youtube.com/vi/_ZLXKt4L-AA/1.jpg',
            'video_id': '_ZLXKt4L-AA'
          },
          {
            'id': 2,
            'lesson': 'Second Lesson',
            'thumbnail': 'https://img.youtube.com/vi/4h0uC9FPVMQ/1.jpg',
            'video_id': '4h0uC9FPVMQ'
          },
          {
            'id': 3,
            'lesson': 'Second Lesson',
            'thumbnail': 'https://img.youtube.com/vi/4h0uC9FPVMQ/1.jpg',
            'video_id': '4h0uC9FPVMQ'
          }
        ],
        'name': 'Second Lesson'
      }
    ];
    let categoriesRow = videosData.map((item) => {
      return self.Categories(item);
    });
    return (
      <Collapsible popout defaultActiveKey={1}>
        {categoriesRow}
      </Collapsible>
    )
  }
  Categories(category) {
    let videoRow = category.videos.map((item, i) => {
      return (
        <Col s={2} offset={'s1'}>
          <Link to={'/learning/' + item.video_id}>
            <img className='video-image' src={item.thumbnail} key={i.toString()}/>
          </Link>
        </Col>
      )
    });
    return (
      <CollapsibleItem header={category.name} key={category.id.toString()}>
        <Row>
          {videoRow}
        </Row>
      </CollapsibleItem>
    )
  }
  render() {
    return (
      <div className='home-page'>
        {this.Profile()}
        {this.Menu()}
        {this.LessonsCategories()}
      </div>
    )
  }
}
