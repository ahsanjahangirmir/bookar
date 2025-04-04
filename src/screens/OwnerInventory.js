import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Modal, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Make sure this package is installed
import {Ionicons} from '@expo/vector-icons';
import {ipAddr} from './ipconfig.js';

const OwnerInventoryScreen = () => {
  
  const [inventoryItems, setInventoryItems] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { emailProp, currentUser } = route.params;
  const [selectedTab, setSelectedTab] = useState('cart');
  const [modalVisible, setModalVisible] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const email = emailProp;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`http://${ipAddr}:3000/fetchinventory?email=${email}`);
        const data = await response.json();
        setInventoryItems(data.items);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };
    fetchInventory();
  }, [email]);

  const handleTabPress = (tabName) => {
    
      updateInventory();
      setSelectedTab(tabName);
  
      switch (tabName) {
        case 'home':
            navigation.navigate('OwnerHomepage', { email: email });
          break;
        case 'list':
            navigation.navigate('OwnerBookings', {
              emailProp: emailProp,
              currentUser: currentUser
            })
            break;
        case 'cart':
          // Navigate to 'OwnerInventory' screen when cart tab is pressed
          break;
        case 'person':
          navigation.navigate('StatScreen', { emailProp: email, currentUser: currentUser });
          break;
        default:
          break;
      }
  };


  const updateInventory = async () => {
    try {
      const nonZeroItems = inventoryItems.filter(item => item.quantity > 0);
      await fetch(`http://${ipAddr}:3000/updateinventory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, items: nonZeroItems }),
      });
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };
  

  const handleBackPress = () => {
    updateInventory();
    navigation.goBack();
  };


  const updateQuantity = (name, change) => {
    setInventoryItems(items => items.map(item => {
      if (item.name === name) {
        const updatedQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(0, updatedQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0)); // Filter out items with quantity 0
  };


  const renderItem = (item) => {
    return (
      <View key={item.name} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity style={styles.counterButton} onPress={() => updateQuantity(item.name, -1)}>
            <Icon name="minus" size={24} color="#C4C4C4" />
          </TouchableOpacity>
          <Text style={styles.counterText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.counterButton} onPress={() => updateQuantity(item.name, 1)}>
            <Icon name="plus" size={24} color="#C4C4C4" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const addItem = () => {
    if (newItemName.trim()) {
      setInventoryItems([...inventoryItems, { name: newItemName, quantity: 1 }]);
      setNewItemName(''); // Reset the input
      setModalVisible(false); // Close the modal
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => handleBackPress()} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#C4C4C4" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Inventory Management</Text>
          </View>
          {inventoryItems.map(renderItem)}
          <TouchableOpacity style={styles.addItemButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addItemButtonText}>Add Item</Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter the name of the new item:</Text>
              <TextInput
                style={styles.modalInput}
                onChangeText={setNewItemName}
                value={newItemName}
                placeholder="Item Name"
              />
              <TouchableOpacity
                style={styles.buttonClose}
                onPress={addItem}
              >
                <Text style={styles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons
            name={'home'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('list')}
        >
          <Ionicons
            name={'calendar'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('cart')}
        >
          <Ionicons
            name={'cart'}
            size={24}
            color={'#D45A01'}
          />
          <Text style={styles.navbarText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navbarTab}
          onPress={() => handleTabPress('person')}
        >
          <Ionicons
            name={'logo-usd'}
            size={24}
            color={'#7D7D7D'}
          />
          <Text style={styles.navbarText}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalInput: {
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 200,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  backButton: {
    marginRight: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 22,
    color: '#C4C4C4',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
    marginRight: 30
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical:20,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  itemText: {
      fontFamily: 'UrbanistBold',
      alignSelf: 'flex-start',
      marginLeft:15,
    color: '#c4c4c4',
    fontSize: 18,
  },
  counterButton: {
    backgroundColor: '#35383F',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  counterText: {
    color: '#c4c4c4',
    fontSize: 18,
    marginHorizontal: 40,
  },
  addItemButton: {
    backgroundColor: 'rgba(212, 90, 1, 0.5)',
    borderRadius: 26.5,
    paddingVertical: 15,
    marginHorizontal:20,
    alignItems: 'center',
    marginTop: 50
  },
  addItemButtonText: {
    color: '#c4c4c4',
    fontSize: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#000000',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  navbarTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarTabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbarText: {
    fontSize: 10,
    marginTop: 4,
    color: '#C4C4C4',
  },
  });

  export default OwnerInventoryScreen;
  