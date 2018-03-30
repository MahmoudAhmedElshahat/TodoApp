import React from 'react';
import { TouchableOpacity , Text  , StyleSheet} from 'react-native';





const styles =StyleSheet.create({
   button : {
     height : 50 ,
     borderRadius: 5,
     marginHorizontal: 16 ,
     marginVertical : 10 ,
     backgroundColor: '#E53935',
     justifyContent: 'center',
     flex : 1 ,
   },
   textStyle : {
     textAlign: 'center',
     color : '#fff' ,
     fontSize:16 ,
     fontWeight : '600',
   }
});


const Button = (props) => {
  return (
    <TouchableOpacity style = {styles.button} onPress= {props.onPress} >
      <Text style={styles.textStyle}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );}




export  {Button};
