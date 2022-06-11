import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const Taksmodal = (content) => {
    const [newtask, setNewTask] = useState()
    const [newdesc, setNewDesc] = useState()
    const [editable, setEditable] = useState(false)

    const handleEditTask = () => {
        setEditable(true)
    }

    const handleDone= (key, token) => {
        const content = {
            name: newtask,
            description: newdesc
        }
        const headers = {
            'x-auth-token': token
        }

        axios.put("https://binasticdeploy.herokuapp.com/api/task/"+key, content, { headers: headers })
        .then(res => console.log(res.data))

        setEditable(false)
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.cross}
                onPress={content.closeModal}
            >
                <Text
                    style={{
                        fontSize: 17
                    }}
                >⛔</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 100, margin: 32 }} >
                <Text style={styles.title}> {content.name} </Text>
                <View style={{ borderBottomColor: '#F2B601', borderBottomWidth: 1, marginBottom: 15 }} />
                <View style={styles.details}>
                    <Text style={styles.descriptionTitle}>Detalles de la tarea: </Text>
                    <Text style={styles.description}>{content.desc}</Text>
                </View>
                <View style={styles.details} >
                    <Text style={styles.descriptionTitle}>Acciones: </Text>
                    <View style={styles.actions} >
                        <Pressable
                            style={styles.edit}
                            onPress={() => handleEditTask()}
                        >
                            <Text>Editar</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{ borderBottomColor: '#F2B601', borderBottomWidth: 1, marginBottom: 15 }} />
                <View style={styles.inputContainer}>
                    <Text
                        style={{
                            color: "black",
                            marginVertical: 10
                        }}
                    >Nombre de la tarea: </Text>
                    <TextInput style={styles.inputsName}
                        placeholder={content.name}
                        underlineColorAndroid='transparent'
                        editable={editable}
                        selecselectTextOnFocus={false}
                        onChangeText={newTask => setNewTask(newTask)}
                    />
                    <Text
                        style={{
                            color: "black",
                            marginVertical: 10
                        }}
                    >Descripción de la tarea: </Text>
                    <TextInput style={styles.inputsDesc}
                        placeholder={content.desc}
                        underlineColorAndroid='transparent'
                        editable={editable}
                        selecselectTextOnFocus={false}
                        onChangeText={newDesc => setNewDesc(newDesc)}
                    />
                    <Pressable
                            style={styles.done}
                            onPress={() => handleDone(content.id, content.token)}
                        >
                            <Text style={{color: "white"}} >Hecho</Text>
                        </Pressable>
                </View>
            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default Taksmodal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8eaed'
    },
    cross: {
        position: "absolute",
        top: 40,
        right: 32,
        zIndex: 10
    },
    title: {
        fontSize: 35,
        fontWeight: "700",
        color: "black",
        textAlign: "left",
        marginBottom: 20
    },
    details: {
        padding: 20,
        backgroundColor: "white",
        lineHeight: "10",
        marginBottom: 15
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 5,
        color: "black"
    },
    description: {
        color: "black",
    },
    actions: {
        display: "flex",
        gap: 15,
        marginTop: 15,
        paddingHorizontal: 75
    },
    edit: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#F2B601',
    },
    inputsName: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: "#c0c0c0",
        borderWidth: 1,
        width: 250,
        color: "black"
    },
    inputsDesc: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderRadius: 60,
        borderColor: "#c0c0c0",
        borderWidth: 1,
        width: 250,
        color: "black"
    },
    inputContainer: {
        display: "flex",
        gap: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    done: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0199b0',  
        marginTop: 15,    
    }
})