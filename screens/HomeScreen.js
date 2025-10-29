import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import { Button } from 'react-native-elements';
import { db } from './firebase';
import { addDoc, collection, doc, updateDoc, getDocs, query  } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HomeScreen({ navigation, route}) {

  const { user } = route.params;
  const [contatos, setContatos] = useState([]);
  
  useEffect(() => {
    const getcontatos = async () => {
    try {
      const q = query(
        collection(db, "contato"),
      );

      const querySnapshot = await getDocs(q);


      if (!querySnapshot.empty) {
        const listcontatos = [];
        querySnapshot.forEach((doc) => {
          listcontatos.push({id: doc.id, ...doc.data()});
        });
        setContatos(listcontatos)
      } else {
        alert("Não há contatos!");
      }
    } catch (err) {
      console.log("ERROR: ", err);
      alert("Houve um erro. Contate o suporte.");
    }

  }
    getcontatos();
}, [])


  return (
   <SafeAreaView style={styles.safeArea}>
  <View style={styles.container}>
    
    {/* Header Simplificado */}
    <View style={styles.header}>
      
      {/* Mensagem de Boas-vindas */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>
          Bem-vind@,
        </Text>
        <Text style={styles.userName}>
          {user.nome.split(" ")[0]}
        </Text>
      </View>

      {/* Botão de Logout */}
      <Button 
        title="Logout" 
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.logoutButton}
        titleStyle={styles.logoutButtonText}
      />
    </View>


    <View style={styles.contactsContainer}>
      <TouchableOpacity 
        onPress={() => navigation.navigate("CantatoUpdate", { user: user })}
        style={styles.addContactButton}
      >
        <Icon name="person-add" size={24} color="red" />
        <Text style={styles.addContactText}>Add Contatos</Text>
      </TouchableOpacity>
      
      {/* Areas Mapper */}
      {contatos.map((contato, index) => (
        <View style={styles.contactCard} key={index}>

        <TouchableOpacity 
          onPress={() => navigation.navigate("CantatoUpdate", {contatoID:contato.id, user:user})}
          style={styles.contactButton}
        >
          <View style={styles.contactIconContainer}>
            <Icon name="person" size={30} color="#0722b2" />
          </View>
          <Text style={styles.contactName}>{contato.nome}</Text>
          <View style={styles.contactInfo}>
            <Icon name="email" size={12} color="#666" />
            <Text style={styles.contactEmail}>{contato.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Icon name="phone" size={12} color="#666" />
            <Text style={styles.contactPhone}>{contato.telefone}</Text>
          </View>
        </TouchableOpacity>
      
        </View>
      ))}
    </View>
  </View>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#0722b2", 
    flex: 1
  },
  container: {
    flex: 1, 
    padding: 20
  },
  header: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 20
  },
  welcomeContainer: {
    // Estilos para o container de boas-vindas
  },
  welcomeTitle: {
    fontWeight: "bold", 
    fontSize: 20, 
    color: "white"
  },
  userName: {
    color: "white", 
    fontSize: 16
  },
  logoutButton: {
    backgroundColor: "red"
  },
  logoutButtonText: {
    fontSize: 14
  },
  contactsContainer: {
    display: "flex", 
    flexDirection: "row", 
    gap: 20, 
    flexWrap: "wrap", 
    alignItems: "center", 
    alignContent: "center", 
    justifyContent: "center",
    marginTop: 20
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addContactText: {
    color: "red", 
    textAlign: "center", 
    fontSize: 16, 
    fontWeight: "bold"
  },
  contactCard: {
    display: "flex", 
    width: 140, 
    alignItems: "center", 
    alignContent: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10
  },
  contactButton: {
    alignItems: 'center',
    width: '100%'
  },
  contactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  contactName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0722b2",
    textAlign: "center",
    marginBottom: 8
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 5
  },
  contactEmail: {
    fontSize: 11,
    color: "#333",
    textAlign: "center"
  },
  contactPhone: {
    fontSize: 11,
    color: "#666",
    textAlign: "center"
  }
});

export default HomeScreen;