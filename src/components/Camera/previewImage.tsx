import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';

interface PreviewImageProps {
    onSelectResult?: any;
    imageUri: string;
}

const PreviewImage: React.FC<PreviewImageProps> = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: props.imageUri }} style={styles.image}>
                <View style={styles.actionBoxArea}>
                    <TouchableOpacity
                        style={{...styles.buttonAction, backgroundColor: Colors.colorDanger}}
                        onPress={() => props.onSelectResult({ acceptImage: false })
                        }>

                        <Text style={styles.buttonActionText}>Descartar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{...styles.buttonAction, backgroundColor: Colors.colorSuccess}}
                        onPress={() => props.onSelectResult({ acceptImage: true })
                        }>

                        <Text style={styles.buttonActionText}>Salvar Imagem</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end"
    },

    actionBoxArea: {
        height: 144,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 40,
        backgroundColor: "#000000a0",
        justifyContent: 'space-between',

        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    buttonAction: {
        height: 50,
        borderRadius: 20,
        padding: 12,
        justifyContent: 'center'
    },

    buttonActionText: {
        color: "#FFF",
        fontSize: 16
    }

})

export default PreviewImage;