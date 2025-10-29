import { addDoc, collection, doc, updateDoc, getDoc, deleteDoc} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';

import {db} from './firebase';

function ContatosUpdateScreen({navigation, route}) {
  const { contatoID, user } = route.params;

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const deleteContato = async (contatoID) =>{
    try {
        await deleteDoc(doc(db, "contato", contatoID));
        
        alert("contato excluído com sucesso!");
        navigation.navigate('Home', {user:user});
    } catch (e) {
        alert("Houve um erro ao tentar excluir essa área. Tente novamente. Se persistir o erro, contate o suporte.")
        console.error("Erro ao excluir area: ", e);
        }
    }

  useEffect(() => { 
    const getContato = async () =>{
      try{ 
        if(contatoID){
          const docRef = doc(db, "contato", contatoID);
          const queryContato = await getDoc(docRef);
          if(queryContato.exists()){        
            setEmail(queryContato.data().email);
            setNome(queryContato.data().nome);
            setTelefone(queryContato.data().telefone);
        }}
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
    getContato();
  }, [contatoID]);

  const EditSaveContato = async () =>{
      try{ 
        if(contatoID){
         await updateDoc(doc(db, "contato", contatoID), {email, nome,telefone});
          navigation.navigate('Home', {user:user});
        }
        else {
          await addDoc(collection(db, "contato"), {email, nome,telefone,createdAt: new Date()});
          navigation.navigate('Home', {user:user});
        }
    } catch(e){
        console.log("ocorreu um erro", e)
    }
  }
  return(
    <SafeAreaView style={styles.safeArea}>
      {contatoID ? (
        <Text style={styles.title}>Edit Contato</Text>
      ) : (
        <Text style={styles.title}>Cadastro Contato</Text>
      )}
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder="ex@gmail.com" 
            value={email} 
            onChangeText={setEmail} 
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder="Osvaldo Freitas" 
            value={nome} 
            onChangeText={setNome}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Telefone: </Text>
          <Input 
            inputContainerStyle={styles.input} 
            containerStyle={styles.inputWrapper}  
            placeholder='Ex: 12345678901' 
            value={telefone} 
            onChangeText={setTelefone}
          />
        </View>
        <View style={styles.buttonContainer}>         
          <Button 
            title={contatoID ? "Atualizar" : "Cadastrar"} 
            onPress={EditSaveContato}
            buttonStyle={styles.saveButton}
          />
        </View>
        {contatoID ? (
            <TouchableOpacity 
              onPress={() => deleteContato(contatoID)}
              style={styles.deleteButton}
            >
                <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
        ) : (
            <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30, 
    textAlign: "center", 
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 30,
    color: '#0722b2'
  },
  container: {
    padding: 20,
    flex: 1
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
  inputWrapper: {
    paddingHorizontal: 0, 
    marginTop: 0, 
    marginBottom: 0
  },
  buttonContainer: {
    marginBottom: 20
  },
  saveButton: {
    backgroundColor: '#0722b2',
    height: 50,
    borderRadius: 8
  },
  deleteButton: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red'
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ContatosUpdateScreen;