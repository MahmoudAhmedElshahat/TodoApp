
import React , { Component ,  } from 'react';
import { View, StatusBar ,Text, StyleSheet, AsyncStorage, ActivityIndicator, Image } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E53935',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    paddingTop: 10
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
  }
});





//create componenet
class SplashScreen extends Component{

  componentDidMount() {
     AsyncStorage.getItem('app_token')
       .then(token => {
           if (token) {
             this._navigate('Home');
           }else {
             this._navigate('Login');
           }
       });
   }

     //Added this dummy method to cause a delay just to see the splash
   _navigate(screen) {
     setTimeout(() => {
       this.props.navigation.navigate(screen);
     }, 2000 );

   }

   render(){
     return (
       <View style={styles.container}>
       <StatusBar
          backgroundColor='#E53935'
          barStyle="light-content"
          />
         <Image source={require('./src/icon.png')} style={styles.image}/>
         <ActivityIndicator  size={'small'} />
         <Text style={styles.loadingText}>Loading ...</Text>
       </View>
     );
   }
 }



export default SplashScreen;
