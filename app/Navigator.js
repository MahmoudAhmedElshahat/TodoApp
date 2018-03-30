import {
  StackNavigator,
} from 'react-navigation';

import Home from './Home'
import Login from './Login'
import SplashScreen from './SplashScreen'



const Navigator = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      header: false,

    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
      headerStyle: {
        backgroundColor:'#F44336'
      },
      headerTintColor: "white",


    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },


});

export default Navigator;
