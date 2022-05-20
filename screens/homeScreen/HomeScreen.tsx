import { StyleSheet, Text, View, TouchableOpacity, Modal, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { collection, query, getDocs, where, doc, setDoc } from "firebase/firestore";
import { TextInput } from 'react-native';

const HomeScreen = () => {
  const [ingredients, setIngrdients] = useState<Array<any>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newItem, setNewItem] = useState<string>('');
  // const [expDays, setExpDays] = useState<any>(null);
  const navigation = useNavigation();

  const lookInFridge = async () => {
    const q = query(collection(db, 'fridge'), where('user_email', '==', auth.currentUser?.email));
    const snapshot = await getDocs(q);
    const temp:any = [];
    snapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      temp.push(doc.data());
    });
    setIngrdients(temp);
  };

  useEffect(() => {
    lookInFridge();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('LoginScreen' as never)
      })
      .catch((error: { message: any; }) => alert(error.message));
  };

  const putInFridge = async () => {
    if (!newItem) {
      alert('No Item Specified');
      return;
    }
    const fridgeRef = doc(collection(db, 'fridge'));
    await setDoc(fridgeRef, {
      user_email: auth.currentUser?.email,
      item: newItem,
    });
    setModalVisible(!modalVisible);
    lookInFridge();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
          <View style={styles.inputContainer}>
          <Text style={styles.modalText}>Add an item to your fridge</Text>
        <TextInput
          placeholder="Item"
          onChangeText={(text) => setNewItem(text)}
          style={styles.input}
        />
        {/* <TextInput
          keyboardType='numeric'
          placeholder="Days til you toss this"
          onChangeText={(text) => setExpDays(Number(text))}
          style={styles.input}
        /> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={putInFridge}>
        <Text style={styles.buttonText}>Toss into fridge</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.buttonOutlineText}>Go Back</Text>
      </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Text style={styles.title}>Stuff in your Fridge</Text>
      {ingredients?.map((entry) => <Text key={entry.id} style={styles.item}>{entry.item}</Text>)}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.buttonText}>Add an item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleSignOut}>
        <Text style={styles.buttonOutlineText}>Sign Out</Text>
      </TouchableOpacity>
      <Text>user: {auth.currentUser?.email}</Text>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  modalView: {
    flex: 1,
    height: "50%",
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
  },
  item: {
    fontSize: 20,
    padding: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
