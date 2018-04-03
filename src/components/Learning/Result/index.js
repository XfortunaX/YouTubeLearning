import React, { Component } from 'react'
import { Link } from 'react-router'
import './styles.scss'
import TextModel from '../../../models/textModel'
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
// import Icon from 'material-ui/Icon';
import { CircularProgress } from 'material-ui/Progress';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

export default class Result extends Component {
  constructor() {
    super();

    this.text = new TextModel();
    this.state = {
      numSuccess: 0,
      numError: 0,
      numMiss: 0,
      numTotal: 0,
      numAll: 0
    };

    this.percentCalc = this.percentCalc.bind(this);
    this.percentTrue = this.percentTrue.bind(this);
   }
  componentDidMount() {
    // console.log(this.text.getText());
    this.percentCalc();
  }
  percentCalc() {
    let subText = this.text.getText();
    let numTotal = 0;
    let numTotalSuccess = 0;
    let numTotalError = 0;
    let numTotalMiss = 0;
    subText.forEach((item) => {
      let base = false;
      item.forEach((word) => {
        if (word.state === 'base') {
          base = true;
        }
      });
      if (base === true) {
        numTotal += 1;
        item.forEach((word) => {
          if (word.state === 'success') {
            numTotalSuccess += 1;
          } else if (word.state === 'error') {
            numTotalError += 1;
          } else if (word.state === 'miss') {
            numTotalMiss += 1;
          }
        });
      }
    });
    // console.log(numTotalSuccess, numTotalError, numTotalMiss, numTotal, subText.length)
    this.state.numSuccess = numTotalSuccess;
    this.state.numError = numTotalError;
    this.state.numMiss = numTotalMiss;
    this.state.numTotal = numTotal;
    this.setState({ numAll: subText.length });
  }
  createText() {
    let self = this;
    let subText = this.text.getText();
    let num = 0;
    let text = subText.map((item) => {
      let one = self.createSub(item, num)
      num += item.length;
      return one
    });
    return (
      <div className='Text' style={{ maxHeight: 350, overflowY: 'auto' }}>
        {text}
      </div>
    )
  }
  createSub (sub, i) {
    let subOne = sub.map((item, j) => {
      return (
        <div
          key={i + j}
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
    return (
      <div className='subs' key={i}>
        {subOne}
      </div>
    )
  }
  percentTrue() {
    if (this.state.numSuccess !== 0 || this.state.numError !== 0) {
      return Math.floor(this.state.numSuccess / (this.state.numSuccess + this.state.numError) * 100)
    } else {
      return 0;
    }
  }
  percentTotal() {
    return Math.floor(this.state.numTotal / this.state.numAll * 100)
  }
  render() {
    return (
      <div className='result-page'>
        <Card style={styles.card}>
          <CardContent style={{ padding: 0 }}>
            <Grid container spacing={24} justify={'center'} alignContent={'center'} style={{ width: '100%', margin: 0 }}>
              <Grid item xs={12} style={{ borderBottom: '1px solid', background: 'rgba(238, 238, 238, 1)' }}>
                <Grid container spacing={24} justify={'center'} alignContent={'center'}>
                  <Grid item xs={3}>
                  </Grid>
                  <Grid item xs={6} style={ styles.title }>
                    Статистика
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
              <Grid item xs={5} style={{ position: 'relative' }}>
                <div style={{ fontSize: '2.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                  Пройдено
                </div>
                <div style={ styles.diagramNum }>
                  {this.percentTotal()}%
                </div>
                <CircularProgress style={ styles.diagram } variant='static' value={this.percentTotal()} />
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={5} style={{ position: 'relative' }}>
                <div style={{ fontSize: '2.5em', fontFamily: 'Lobster cursive', fontStyle: 'italic' }}>
                  Правильные
                </div>
                <div style={ styles.diagramNum }>
                  {this.percentTrue()}%
                </div>
                <CircularProgress style={ styles.diagram } variant='static' value={this.percentTrue()} />
              </Grid>
              <Grid item xs={12}  style={{ padding: 0, borderTop: '1px solid' }}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ textAlign: 'center', fontSize: '2em', fontFamily: 'Lobster cursive', fontStyle: 'italic', fontWeight: 600 }}>Подробнее</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {this.createText()}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
  title: {
    textAlign: 'center',
    fontSize: '2.5em',
    fontFamily: 'Lobster cursive',
    fontStyle: 'italic',
    fontWeight: 600,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  diagram: {
    color: 'rgba(67, 160, 71, 1)',
    width: 240,
    height: 240
  },
  diagramNum: {
    fontSize: '3.5em',
    position: 'absolute',
    fontStyle: 'italic',
    fontWeight: 600,
    left: '36%',
    top: '45%'
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
        fontSize: '1.8em'
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
