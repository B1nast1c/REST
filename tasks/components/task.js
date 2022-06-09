import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, {useState} from 'react';
import Taksmodal from './taksmodal';
import axios from 'axios';

const Task = (content) => {
  const [show, setshow] = useState(false)
  const showModal = () => {
    setshow(!show)
  }

  const handleDeleteTask = (key, token) => {
    const headers = {
      'x-auth-token': token
    }
    axios.delete("http://127.0.0.1:9000/api/task/"+key, { headers: headers })
    .then(() => console.log(key))
    .catch(err => console.log(err))
  }

  return (
    <View>
      <Modal animationType='slide' visible={show} onRequestClose={() => showModal()}>
        <Taksmodal 
          name={content.text} 
          desc={content.info}
          id={content.id}
          token={content.token}
          closeModal={() => showModal()}
        />
      </Modal>
      <TouchableOpacity
      onPress={() => showModal()}
      >
        <View style={styles.task}>
          <View style={styles.taskLeft}>
          <Icon name="ios-checkbox" size={24} color="#1B9B41" />
            <Text style={styles.taskText}> {content.text} </Text>
          </View>
          <Icon name="trash-outline" size={20} color="#D9534F" onPress={() => handleDeleteTask(content.id, content.token)}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
  task: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  taskLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  item: {
    width: 24,
    height: 24,
    backgroundColor: "#55bce6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15
  },
  taskText: {
    maxWidth: "80%"
  },
  mark: {
    width: 12,
    height: 12,
    borderColor: "#55bcf6",
    borderWidth: 2,
    borderRadius: 5
  }
})