import React , { Component } from 'react';
import { Text   , View  , AsyncStorage
  , FlatList ,ActivityIndicator , StyleSheet , Switch,RefreshControl ,BackHandler } from 'react-native';
import {fetchTasks, addTask} from './actions';
import {connect} from 'react-redux';

import { ListItem } from './common';

import { Toolbar  , ThemeProvider } from 'react-native-material-ui';

import Dialog from "react-native-dialog";




const uiTheme = {
    palette: {
        primaryColor: '#F44336',
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};
const loadingStyle = StyleSheet.create({
    content:{
      flex: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
});



class Home extends Component{



  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true;

    });  }




  state = {
     dialogVisible: false,
     done:false,
     name : 'Task 1'

   };

   _onRefreshTasks() {
     this.props.fetchTasks();
   }
   componentWillReceiveProps(nextProps)
   {
     if(nextProps.saved) {
       this.handleCancel();
     }
   }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false  , name : 'Task 1'});

  };

  addTask = () => {
    const { name , done } =  this.state;
    this.props.addTask({name , done})
  };








  componentDidMount() {
    this.props.fetchTasks();
  }

  renderListItem = ({item}) => {
    return <ListItem name={item.name} status={item.done} />
  }

  render()
  {

    return (
        <View  style={{flex:1}} >


          <ThemeProvider uiTheme={uiTheme}>
             <Toolbar
             centerElement="Home"
             rightElement={{
                              menu: { labels: ['logout', 'Add Task'] },
                          }}
                          onRightElementPress={(e) => {
                            if(e.index === 0)
                            {
                              AsyncStorage.removeItem('app_token');
                              this.props.navigation.navigate('Login');
                            }
                            else {
                                this.showDialog()
                            }
              }}
             />
          </ThemeProvider>

           <FlatList
           data={this.props.tasks}
           renderItem={this.renderListItem}
           keyExtractor={item => item._id}
           refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this._onRefreshTasks.bind(this)}
            />
          }
           />







         <View>
         <Dialog.Container  visible={this.state.dialogVisible}>
           <Dialog.Title>Add Task</Dialog.Title>
           <Dialog.Input onChangeText={(name) => this.setState({ name }) }>
              {this.state.name}
           </Dialog.Input>
           <Dialog.Button label="Cancel" onPress={this.handleCancel} />


           <Dialog.Button label="Add" onPress={this.addTask} />


           <View style={{  flexDirection: 'row' , alignItems : 'center' , height: 40 }}>
           <Text style={{ fontSize:16 , paddingLeft:8 ,  flex:1  , color :'black'}}>Task Status</Text>
             <Switch
                style={{justifyContent:'flex-end'}}
                onValueChange={(done) =>  this.setState({ done })}
                value={this.state.done}
             />
           </View>

          <Text  style={{color:'red' , paddingLeft:8}} >{this.props.addError} </Text>
          <View>

           {this.props.addLoading &&
               <ActivityIndicator size='small' style={{marginTop:10,marginBottom:20}}/> }

           </View>


         </Dialog.Container>
       </View>


        </View>
      )
  }

}

const mapStateToProps = state => ({
    error: state.taskList.error,
    loading : state.taskList.loading,
    tasks : state.taskList.tasks,

    addError: state.addTask.error,
    addLoading: state.addTask.loading,
    saved: state.addTask.saved
  })



export default connect(mapStateToProps, {fetchTasks , addTask})(Home);
