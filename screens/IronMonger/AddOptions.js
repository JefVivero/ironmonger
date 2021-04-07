import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, BottomSheet, ListItem} from 'react-native-elements'

export default function AddOptions({navigation}) {
    const [isVisible, setIsVisible] = useState(false)

    const list = [
        { title: 'Crear Ferreteria' ,
            onPress: () => navigation.navigate("add-ironmonger", {setIsVisible}),
        },
        { title: 'Prestar Servicio',
            //onPress: () => ,
        },
        {
          title: 'Cancelar',
          containerStyle: { backgroundColor: 'red' },
          titleStyle: { color: 'white' },
          onPress: () => setIsVisible(false),
        },
    ]

    return (
        
            <View style={styles.viewBody}>
                <Button
                    title="Ver opciones"
                    onPress={()=> setIsVisible(true)}
                    containerStyle={styles.btnContainer}
                    buttonStyle = {styles.btn}
                ></Button>
                <BottomSheet
                    isVisible={isVisible}
                    containerStyle={styles.btnSheet}
                    
                >   
                    {list.map((l, i) => (
                        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                            <ListItem.Content>
                                <ListItem.Title 
                                    style={l.titleStyle}>{l.title}
                                </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </BottomSheet>
            </View>
       
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1
    },
    btnSheet:{ 
        backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' 
    },
    btnContainer:{        
        bottom: 3,
        width: "95%", 
        position: "absolute",
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    },
    btn:{
        backgroundColor: "#0e5f6a"
    }
})
