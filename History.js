import * as React from 'react';
import { useState } from 'react';
import { DataTable } from 'react-native-paper';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Modal,
} from 'react-native';

export default function History({ navigation, route }) {
  const [dataObj, setDataObj] = useState(route.params.historyObject);
  const [modalVisible, setModalVisible] = useState(false);

  const clearHistory = () => {
    for (let i = 0; i < dataObj.length; i++) {
      setDataObj(delete dataObj[i]);
    }
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor="#196F3D" />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Original Price</DataTable.Title>
          <DataTable.Title numeric>Discount %</DataTable.Title>
          <DataTable.Title numeric>Final Price</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={dataObj}
          renderItem={({ item, index }) => {
            if (item != undefined) {
              return (
                
                  <DataTable.Row>
                    <DataTable.Cell>Rs {item.original_Price}</DataTable.Cell>
                    <DataTable.Cell numeric>
                      {item.discount_Percentage}%
                    </DataTable.Cell>
                    <DataTable.Cell numeric>
                      Rs {item.final_Price_Var}
                    </DataTable.Cell>
                  </DataTable.Row>
                
              );
            }
          }}
          keyExtractor={(index) => {
            return index;
          }}
        />
      </DataTable>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>  
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  clearHistory();
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        
      </Modal>

      
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    // backgroundColor: 'black',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 280,
  },
  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 13,
  },
  modalBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    padding: 10,
    width: 80,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textStyle: {
    color: 'white',
  },
});
