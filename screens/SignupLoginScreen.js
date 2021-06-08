import * as React from 'react';
import {
  TextInput,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import ExchangeClass from '../components/exchangeClass'

export default class SignupLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      isVisible:'false',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:''
    };
  }
  userSignUp = (emailId, password,confirmPassword) => {
    if(password !== confirmPassword){
      return Alert.alert("Password Doesn't Match With Confirm Password.")
    }else{
      firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(() => {
        db.collection('users').add({
          'first_name':this.state.firstName,
          'last_name':this.state.lastName,
          'mobile_number':this.state.contact,
          'username':this.state.emailId,
          'address':this.state.address
        })
        return Alert.alert(
          'User Added Successfully',
          '',
          [
            {text:'OK',onPress:() => this.setState({isVisible:false})},
          ]
        );
      })
      .catch((error) =>{
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
    }
    
  };
  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        return Alert.alert('Successfully Logged In');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
      
  };
  showModal=()=>{
    
    return(
    
    <Modal
        animationType="slide"
        visible={this.state.isVisible}
        transparent={true}
        >
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={'First Name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ firstName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Last Name'}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({ lastName: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Mobile Number'}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={(text) => {
                  this.setState({ contact: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({ address: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Email ID'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
              />
              <TextInput
                style={styles.formTextInput}
                placeholder={'Confirm Password'}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({ isVisible: false });
                  }}>
                  <Text style={{ color: '#ff5722' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
                }
  render() {
    return (
      <View style={{ backgroundColor: '#FFE0B2' }}>
        <View>{this.showModal()}</View>
        <View style={{ backgroundColor: '#FFE0B2' }}>
          <ExchangeClass/>
          <Text style={styles.title}>Barter</Text>
        </View>
        <Text
          style={{
            color: '#ff5722',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 15,
          }}>
          EMAIL ID
        </Text>
        <View style={{ alignItems: 'center' ,backgroundColor: '#FFE0B2' }}>
          <TextInput
            style={styles.loginBox}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}
          />
        </View>

        <Text
          style={{
            color: '#ff5722',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 15,
          }}>
          PASSWORD
        </Text>
        <View style={{ alignItems: 'center',backgroundColor: '#FFE0B2'  }}>
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View style={{ alignItems: 'center' ,backgroundColor: '#FFE0B2' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
             this.setState({isVisible:true})
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.userLogin(this.state.emailId, this.state.password);
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '700',
    marginTop: 200,
    marginBottom: 80,
    textAlign: 'center',
    color: '#EDAE50',
  },
  loginBox: {
    height: 43,
    fontSize: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EAA073',
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    width: 300,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    marginTop: 8,
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontWeight: '700',
    color: '#ff5722',
  },
  
  keyboardAvoidingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    margin: 50,
    color: '#ff5722',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: {
    color: '#ff5722',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: 200,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});
