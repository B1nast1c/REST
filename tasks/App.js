import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import Task from './components/task';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState()
  const [task, setTask] = useState()
  const [desc, setDesc] = useState()
  const [tasks, setTasks] = useState([])
  const handleAddTask = () => {
    const content = {
      "name": task,
      "description": desc
    }
    const headers = {
      'x-auth-token': token
    }

    axios.post("http://127.0.0.1:9000/api/task", content, { headers: headers })
    .catch(err => console.log(err))

    setTask(null)
    setDesc(null)
  }

  const getTasks = () => {
    axios.get("http://127.0.0.1:9000/api/tasks")
    .then(res => {
      setTasks(res.data.data)
      setToken(res.data.token)
    })
    .catch(err => {
      console.log("Error", err)
    })
  }

  useEffect(() => { //Cuando el componente se monta
    getTasks()
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrapper} >
        <Text style={styles.title} >Tareas Pendientes</Text>

        <View styles={styles.items} >
          {
            tasks.map(task => {
              return(
                <Task text={task.name} key={task._id} info={task.description} id={task._id} token={token} />
              ) 
            })
          }
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput style={styles.input} 
          placeholder={"Nuevo Pendiente"}
          onChangeText={task => setTask(task)}
        >
        </TextInput>
        <TextInput style={styles.input} 
          placeholder={"Descripción"}
          onChangeText={desc => setDesc(desc)}
        >
        </TextInput>
        <TouchableOpacity 
          onPress={() => {
            handleAddTask()
          }}
        >
          <View style={styles.addWrapper} >
            <Text style={styles.add} >+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  wrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputWrapper: {
    position: "absolute",
    bottom: 60,
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#55bce6",
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1
  },
  add: {
    color: "white"
  }
});
