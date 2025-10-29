import { collection, getDocs, query,where } from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { db } from './firebase';
import { StatusBar } from 'expo-status-bar';


function LoginScreen({navigation, route}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  const verifyUser = async () => {
    try {
      const q = query(
        collection(db, "user"),
        where("email", "==", email),
        where("senha", "==", senha)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
         navigation.navigate('Home', {user: {id: doc.id, ...doc.data()}});
        });
      } else {
        alert("E-mail ou senha incorretos!");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      alert("Houve um erro. Contate o suporte.");
    }
  };
 return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.logo}>
          <Text style={styles.logoText}>T</Text>
          <Text style={styles.logoText}>E</Text>
          <Text style={styles.logoText}>S</Text>
          <Text style={styles.logoText}>T</Text>
          <Text style={styles.logoText}>E</Text>
        </Text>
        <View style={styles.formContainer}>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail: </Text>
            <Input 
              inputContainerStyle={styles.input} 
              placeholder='nome@exemplo.com' 
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha: </Text>
            <Input 
              inputContainerStyle={styles.input} 
              placeholder="Senha" 
              secureTextEntry={true} 
              onChangeText={setSenha}
            />
          </View>
          
          <Button 
            title="Logar" 
            onPress={verifyUser}
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
          />
          
          <TouchableOpacity 
            onPress={() => navigation.navigate("Cadastro")}
            style={styles.registerLink}
          >
            <Text style={styles.registerLinkText}>Ainda não tem conta? Cadastre-se</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    fontFamily: 'Squada', 
    fontSize: 100,
    marginBottom: 50
  },
  logoText: {
    // Estilo individual para cada letra do logo, se necessário
  },
  formContainer: {
    width: '100%',
    maxWidth: 400
  },
  inputContainer: {
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50
  },
  loginButton: {
    backgroundColor: '#0722b2',
    height: 50,
    borderRadius: 8
  },
  buttonContainer: {
    marginBottom: 20
  },
  registerLink: {
    padding: 10,
    alignItems: 'center'
  },
  registerLinkText: {
    color: "blue",
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});

export default LoginScreen;