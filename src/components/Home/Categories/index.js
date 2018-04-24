import React, { Component } from 'react'
import { Link } from 'react-router'
import UserModel from '../../../models/userModel'
import VideosModel from '../../../models/videosModel'
import './styles.scss'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Card from 'material-ui/Card';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      user: new UserModel(),
      videos: new VideosModel()
    };
  }
  createCategories() {
    let self = this;
    let categories = this.state.videos.getData()
    if (categories) {
      let categoriesData = categories.map((item) => {
        return self.createCategory(item);
      });
      return (
        <div style={ styles.categories }>
          {categoriesData}
        </div>
      )
    }
  }
  createCategory(category) {
    return (
      <ExpansionPanel style={ styles.category } key={category.id.toString()} defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={ styles.categoryTitleField }>
          <Typography variant='title' style={ styles.categoryTitle }>{ category.name }</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridList style={ styles.listTile } cols={2.5}>
            {category.videos.map( (item, j) => {
                return (
                  <GridListTile key={j.toString()} style={ styles.tile }>
                    <Card style={ styles.videoCard }>
                      <Link to={'/learning/' + item.video_id} style={{ display: 'contents' }}>
                        <img src={item.thumbnail} style={ styles.videoCardImage }/>
                      </Link>
                      <GridListTileBar
                        title={'Video'}
                        style={ styles.tileText }
                      />
                    </Card>
                  </GridListTile>
                )
              })
            }
          </GridList>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
  render() {
    return (
      <div>
        {this.createCategories()}
      </div>
    )
  }
}

const styles = {
  categories: {
    textAlign: 'center',
    maxWidth: '80%',
    margin: 'auto',
    marginTop: 80
  },
  category: {
    marginBottom: 35
  },
  categoryTitle: {
    fontSize: '1.8em',
    fontFamily: 'Lobster cursive',
    fontStyle: 'italic',
    padding: 5,
    fontWeight: 600
  },
  categoryTitleField: {
    borderBottom: '1px solid',
    background: 'rgba(179, 229, 252, 1)'
  },
  videoCard: {
    display: 'flex',
    padding: 4,
    margin: 10,
    height: 200
  },
  videoCardImage: {
    height: '100%'
  },
  listTile: {
    width: '100%',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    overflowX: 'scroll',
    height: 255
  },
  tile: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: 220,
    margin: 10
  },
  tileText: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden'
  }
};

