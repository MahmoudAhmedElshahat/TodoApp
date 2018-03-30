import React, {
  Component
} from 'react';
import {
  Text,
  StatusBar,
  Keyboard,
  View,
  ActivityIndicator ,
  BackHandler ,
  NavigationActions ,
  AppNavigator
} from 'react-native';
import {
  Card,
  CardItem,
  Input,
  Button

} from './common';
import {
  connect
} from 'react-redux';
import {
  loginUser
} from './actions';


class Login extends Component {



  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;

    });  }








  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigation.navigate('Home');
      Keyboard.dismiss(0)

    }
  }


  login() {
    const {
      username,
      password
    } = this.state;
    this.props.loginUser({
      username,
      password
    });
  }

  renderButton() {

    if (this.props.loading) {
      return (<ActivityIndicator size = 'large'style = {{marginTop: 20,justifyContent: 'center',alignItems: 'center',flex: 1}}/>);
    }

    return (
      <Button onPress = {this.login.bind(this)}>
      Login
      </Button>
    );

  }




  render() {
    const { dispatch, nav } = this.props;

    return (
      <Card >

          <StatusBar
           backgroundColor = '#E53935'
           barStyle = "light-content" />

        <CardItem >
            <Input label = 'Email'
            placeholder = 'Enter your email'
            secure = {
              false
            }
            onChangeText = {
              (username) => this.setState({
                username
              })
            }/>
        </CardItem>

       <CardItem >
            <Input
             label = 'Password'
             placeholder = 'Enter your password'
             secure
             onChangeText = {
               (password) => this.setState({
                 password
              })
            } />
       </CardItem>


      <CardItem >
          <Text style = {{marginLeft: 16,color: 'red' }} > {this.props.error} </Text>
      </CardItem>



      <View style = {{ height: 100,  backgroundColor: '#fff'  }} >
          <CardItem >
            {this.renderButton()}
          </CardItem>
      </View>

  </Card>
    )
  }

}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading,
  user: state.auth.user

})

export default connect(mapStateToProps, {
  loginUser
})(Login);
