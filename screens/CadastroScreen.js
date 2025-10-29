import { addDoc, collection} from 'firebase/firestore';
import { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { db } from './firebase';



function CadastroScreen({navigation}){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


  const saveUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "user"), {
        email,
        nome,
        senha,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.navigate('Login');
    } catch (e) {
      console.error("Error adding document: ", e);
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
          <Text style={styles.label}>Nome Completo: </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder='Ex: Vicente Dias Gomes' 
            value={nome} 
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail: </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder="nome@exemplo.com" 
            value={email} 
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha: </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder="********" 
            value={senha} 
            onChangeText={setSenha} 
            secureTextEntry={true} 
          />
        </View>

        <Button 
          title="Cadastrar" 
          onPress={saveUser}
          buttonStyle={styles.registerButton}
          containerStyle={styles.buttonContainer}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Já tem conta? Faça Login</Text>
        </TouchableOpacity>
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
    marginBottom: 40
  },
  logoText: {
    // Estilo individual para cada letra do logo, se necessário
  },
  formContainer: {
    width: '100%',
    maxWidth: 400
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  input: {
    borderBottomWidth: 0,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50
  },
  inputWrapper: {
    paddingHorizontal: 0, 
    marginTop: 0, 
    marginBottom: 0
  },
  registerButton: {
    backgroundColor: '#0722b2',
    height: 50,
    borderRadius: 8
  },
  buttonContainer: {
    marginBottom: 20
  },
  loginLink: {
    color: "blue",
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});

export default CadastroScreen;