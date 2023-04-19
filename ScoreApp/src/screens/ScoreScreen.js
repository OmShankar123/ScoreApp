import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Modal from "react-native-modal"
// import { Ionicons } from '@expo/vector-icons';


const MAX_SCORES = 5;
const SCORES_KEY = 'scores';

const ScoreScreen = () => {
  const [score, setScore] = useState('');
  const [scores, setScores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // Check network connectivity
  const [isConnected, setIsConnected] = useState(true);

  const handleConnectivityChange = (isConnected) => {
    setIsConnected(isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      handleConnectivityChange(state.isConnected);
    });

    // Load scores from AsyncStorage
    const loadData = async () => {
      const data = await AsyncStorage.getItem(SCORES_KEY);
      if (data) {
        setScores(JSON.parse(data));
      }
    };
    loadData();

    return () => {
      unsubscribe();
    };
  }, []);

  const saveScore = async () => {
    if (score === '') {
      Alert.alert('Please enter score');
      return;
    }

    const newScores = [...scores, score].slice(-MAX_SCORES);

    try {
      await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(newScores));
      setScores(newScores);
      setScore('');
      if (!isConnected) {
        Alert.alert('Score saved locally');
      }
    } catch (error) {
      console.log('Error saving score: ', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navView}> 
         <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        {/* <Ionicons name="ios-menu" size={32} color="white" /> */}
        {/* <Text>Button</Text> */}
        <Image style={styles.modalButton}
        source={require('../assests/Images/menu.png')}/>
      </TouchableOpacity></View>
    
      <Text style={styles.title}>Enter score:</Text>
      <View style={styles.inputView}>
        <TextInput
          keyboardType='number-pad'
          style={styles.inputText} value={score} onChangeText={setScore} />
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={saveScore}>
        <Text style={styles.saveText}>SAVE</Text>
      </TouchableOpacity>

      {scores.length > 0 && (
        <View style={styles.scoresContainer}>
          <View style={styles.scoresTitleView}>
            <Text style={styles.scoresTitle}>Max {MAX_SCORES} Scores:</Text>
          </View>


         




          <View style={styles.modalView}>
          <Modal visible={modalVisible} 
          onBackdropPress={()=>setModalVisible(false)}
          transparent={true}
          animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Your Scores:</Text>
              <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            data={scores}
            renderItem={({ item }) => (
              <View style={styles.scoreItem}>
                <Text style={styles.scoreText}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.scoreList}
            contentContainerStyle={styles.flatListContentContainer}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
                <Text style={styles.modalCloseButtonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          </View>


        </View>
      )}

      {!isConnected && <Text style={styles.offlineText}>Offline mode</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
   
    alignItems: 'center',
    // justifyContent: 'center',
  },
  navView:{
    backgroundColor:'#FFA500',
    width:'100%',
    height:'10%',
    justifyContent:'center',
    //  alignItems:'center'
  },
  modalButton:{
  //  backgroundColor:'red',
    width:'30%',
    height:'75%',
    justifyContent:'center',
    //  alignItems:'center',
    marginLeft:8


  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#ffffff',
    marginBottom: 40,
    marginTop:20
  },
  inputView: {
    width: '80%',
    backgroundColor: '#333333',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  saveBtn: {
    width: '80%',
    backgroundColor: '#FFA500',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  saveText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scoresContainer: {
    // marginTop: 20,

    // alignItems: 'center',
    // justifyContent: 'center',
    //  flexDirection:'row',
    // backgroundColor: 'red',
     height: '10%',
    // width: '50%'
  },
  scoresTitleView: {
    //  backgroundColor: "purple",
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  scoresTitle: {
    fontSize: 18,
    color: '#fff',
    // marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  scoreView: {
    // backgroundColor: 'blue',

    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    // flexDirection:'row'

  },
  score: {
    color: '#fff',
    // flexDirection: 'row',
    width: '100%'

  },
  inputText: {
    height: 50,
    color: '#ffffff',
  },
  offlineText: {
    color: 'red',
    // backgroundColor:'red'
    marginTop: 10

  },
  scoreList: {
    marginTop: 20,
    width: '50%',
    // marginBottom:20
    // justifyContent:'space-evenly'
    //alignItems:'center'
  },
  scoreItem: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ccc',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 25

  },
  scoreText: {
    fontSize: 18,
  },
  flatListContentContainer: {
    // justifyContent:'center',
    // alignItems:'stretch',
    // flexDirection:'row-reverse'

  },
  modalView:{
// flex:1,
backgroundColor:'red',
justifyContent:'center',
width:'100%',
// marginTop:30
alignContent:'center',
alignItems:'center',
// height:'100%'
  },
  modalContainer:{
    // flex:1,
     height:'50%',
    //marginTop:'90%',
    backgroundColor:'#FFA500',
    // justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    // borderRadius:2,
    borderTopColor:'red',
    width:'100%',
    // marginLeft:"50%"
    alignContent:'center'

  },
  modalTitle:{
    fontSize: 18,
    color: '#fff',
    // marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  modalCloseButtonText:{
    color:'red'
  }
});
export default ScoreScreen;




// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import NetInfo from '@react-native-community/netinfo';

// const MAX_SCORES = 5;
// const SCORES_KEY = 'scores';
// const API_URL = 'https://example.com/api/scores';

// const ScoreScreen = () => {
//   const [score, setScore] = useState('');
//   const [scores, setScores] = useState([]);
//   const [unsyncedScores, setUnsyncedScores] = useState([]);
//   const [isConnected, setIsConnected] = useState(true);

//   const handleConnectivityChange = (isConnected) => {
//     setIsConnected(isConnected);
//   };

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state) => {
//       handleConnectivityChange(state.isConnected);
//     });

//     const loadData = async () => {
//       const data = await AsyncStorage.getItem(SCORES_KEY);
//       if (data) {
//         setScores(JSON.parse(data));
//       }
//     };
//     loadData();

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (isConnected && unsyncedScores.length > 0) {
//       syncScores();
//     }
//   }, [isConnected]);

//   const saveScore = async () => {
//     if (score === '') {
//       Alert.alert('Please enter score');
//       return;
//     }

//     const newScores = [...scores, score].slice(-MAX_SCORES);

//     try {
//       if (isConnected) {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ score }),
//         });
//         if (!response.ok) {
//           throw new Error('Error syncing score with API');
//         }
//       } else {
//         setUnsyncedScores([...unsyncedScores, score]);
//       }

//       await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(newScores));
//       setScores(newScores);
//       setScore('');

//     } catch (error) {
//       console.log('Error saving score: ', error);
//     }
//   };

//   const syncScores = async () => {
//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ scores: unsyncedScores }),
//       });
//       if (!response.ok) {
//         throw new Error('Error syncing scores with API');
//       }

//       setUnsyncedScores([]);
//     } catch (error) {
//       console.log('Error syncing scores: ', error);
//     }
//   };