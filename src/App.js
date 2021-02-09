import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

// import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, 
//   Tooltip, Legend, LineChart, Line, BarChart, Bar, PieChart, 
//   Pie, Cell, } from 'recharts';


function App() {
  const [data, setdata] = useState({
    Covid: {
      Confirmed : '' ,
      Recovered: '',
      Hospitalized: '',
      Deaths: '',
      NewConfirmed:'',
      NewRecovered:'',
      NewHospitalized:'',
      NewDeaths:'',
      UpdateDate:'',
    }
  });

  const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
      userSelect: 'none',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
     
     
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing.unit * 2,
    },
  
  }));



  useEffect(() => {
  const result = axios.get('https://covid19.th-stat.com/api/open/today')
  .then(response => {
      setdata({
        Covid: {
          Confirmed : response.data['Confirmed'],
          Recovered : response.data['Recovered'],
          Hospitalized : response.data['Hospitalized'],
          Deaths : response.data['Deaths'],
          NewConfirmed: response.data['NewConfirmed'],
          NewRecovered: response.data['NewRecovered'],
          NewHospitalized: response.data['NewHospitalized'],
          NewDeaths: response.data['NewDeaths'],
          UpdateDate: response.data['UpdateDate'],
        }
      });
      console.log(data.covid);
  })
  .catch(function (error) {
      console.log(error);
  })
  
  }, [])

  // const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div  className={classes.root}>
      <CssBaseline/>
      <AppBar>
            <Toolbar >
              <Typography variant="h6" className={classes.title} >
                Thailand COVID-19 
              </Typography>
              <Typography variant="h6"  >
              อัพเดทล่าสุด : {data.Covid.UpdateDate}
              </Typography>
            </Toolbar>
          </AppBar>
          <div  className={classes.appBarSpacer} />
          <div  className={classes.appBarSpacer} />

          <Container>
          <Grid container spacing={3} >
          <Grid item xs={6} sm={3} md={3}>
                <Paper  className={classes.paper} style={{borderStyle: "solid",borderColor: "red"}} >
                  <Typography variant="h5">ติดเชื้อสะสม</Typography>
                  <Typography variant="h3">{data.Covid.Confirmed.toLocaleString()}</Typography>
                  <Typography>เพิ่มขึ้น (+{data.Covid.NewConfirmed.toLocaleString()})</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Paper  className={classes.paper} style={{borderStyle: "solid",borderColor: "green"}}>
                  <Typography variant="h5">หายแล้ว</Typography>
                  <Typography variant="h3">{data.Covid.Recovered.toLocaleString()}</Typography>
                  <Typography>เพิ่มขึ้น (+{data.Covid.NewRecovered.toLocaleString()})</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Paper  className={classes.paper}  style={{borderStyle: "solid",borderColor: "lightblue"}}>
                  <Typography variant="h5">รักษาอยู่ใน รพ.</Typography>
                  <Typography variant="h3">{data.Covid.Hospitalized.toLocaleString()}</Typography>
                  <Typography>เพิ่มขึ้น (+{data.Covid.NewHospitalized.toLocaleString()})</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3} md={3}>
                <Paper  className={classes.paper} style={{borderStyle: "solid",borderColor: "gray"}}>
                  <Typography variant="h5">เสียชีวิต</Typography>
                  <Typography variant="h3">{data.Covid.Deaths.toLocaleString()}</Typography>
                  <Typography>เพิ่มขึ้น (+{data.Covid.NewDeaths.toLocaleString()})</Typography>
                </Paper>
              </Grid>
          </Grid>
          </Container>
    </div>
  );
}

export default App;
