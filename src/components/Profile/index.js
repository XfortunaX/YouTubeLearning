import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../models/userModel'
import './styles.scss'
import { Row, Input, Col, Collapsible, CollapsibleItem } from 'react-materialize'

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: new UserModel()
    }
  }
  profileData() {
    return (
      <div className='nickname'>
        Никнейм:&nbsp;&nbsp;&nbsp;&nbsp; {this.state.user.getData().username}
      </div>
    )
  }
  render() {
    return (
      <div className='profile-page'>
        <div className='back'>
          <Link className='link' to='/'>Вернуться</Link>
        </div>
        <div className='main'>
          <div className='profile-title'>
            Профиль
          </div>
          {/*{this.profileData()}*/}
          <Row className=''>
            <Col s={6} offset={'s3'}>
              <Input className='input__text' s={12} type='select' label='Level' defaultValue='2'>
                <option value='1'>Easy</option>
                <option value='2'>Medium</option>
                <option value='3'>Hard</option>
              </Input>
            </Col>
          </Row>
          <Collapsible>
            <CollapsibleItem header='First' >
              Lorem ipsum dolor sit amet.
            </CollapsibleItem>
            <CollapsibleItem header='Second'>
              Lorem ipsum dolor sit amet.
            </CollapsibleItem>
            <CollapsibleItem header='Third'>
              Lorem ipsum dolor sit amet.
            </CollapsibleItem>
          </Collapsible>
        </div>
      </div>
    )
  }
}