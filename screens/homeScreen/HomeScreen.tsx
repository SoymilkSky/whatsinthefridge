import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { collection, query, getDocs, where } from "firebase/firestore";

const HomeScreen = () => {
  const [ingredients, setIngrdients] = useState<Array<any>>([]);
  const navigation = useNavigation();

  const lookInFridge = async () => {
    const q = query(collection(db, 'fridge'), where('user_email', '==', auth.currentUser?.email));
    const snapshot = await getDocs(q);
    console.log(snapshot);
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
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stuff in your Fridge</Text>
      {ingredients?.map((entry) => <Text key={entry.id} style={styles.item}>{entry.ingredient}</Text>)}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
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
});
