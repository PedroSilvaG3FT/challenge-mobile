import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal, Image, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface CameraProps {
    visible: boolean;
    onClose?: any;
}

const CameraComponent: React.FC<CameraProps> = (props) => {
    const cameraRef = useRef<any>(null);

    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(true);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [showModalPreview, setModalPreview] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getPermissionsAsync();
            setHasPermission(status === 'granted')
        })

    }, [props.visible])

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function alterCamera() {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    async function takePicture() {
        if (!cameraRef) return;

        const data = await cameraRef.current.takePictureAsync();
        setCapturedImage(data.uri);
        setModalPreview(true)
    }

    function resultModal() {
        setModalPreview(false);
        return capturedImage;
    }

    return (
        <>
            <Modal
                animationType="slide"
                visible={props.visible} 
                style={styles.container}
                >
                <Camera
                    style={{ flex: 1 }}
                    ref={cameraRef}
                    type={type}
                    ratio={'16:9'}
                >
                    <View style={styles.cameraContainer}>
                        <View style={styles.closeBoxArea}>
                            <TouchableOpacity
                                onPress={() => props.onClose(null)}>
                                <Icon name="close" size={40} color="#FFFFF0" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.actionBoxArea}>
                            <TouchableOpacity
                                onPress={() => props.onClose(null)}>
                                <Icon name="arrow-left" size={40} color="#FFFFF0" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => takePicture()}>
                                <Icon name="circle-slice-8" size={100} color="#FFFFF0" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => alterCamera()}>
                                <Icon name="autorenew" size={40} color="#FFFFF0" />
                            </TouchableOpacity>
                        </View>

                    </View>
                </Camera>
            </Modal>

            { capturedImage &&
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModalPreview}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <View style={{ flex: 1, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: 'red', height: 40, width: 80, borderRadius: 90 }}
                            onPress={() => {
                                const result = resultModal();
                                props.onClose(result)
                            }}>
                        
                            <Text>Fechar</Text>
                        </TouchableOpacity>

                        <Image
                            style={{ width: '100%', height: 300 }}
                            source={{ uri: capturedImage }}
                        />
                    </View>
                </Modal>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    cameraContainer: {
        flex: 1,
        paddingTop: 12,
        backgroundColor: 'transparent',
        justifyContent: 'space-between'
    },

    closeBoxArea: {
        alignItems: 'flex-end',
        paddingHorizontal: 12
    },

    actionBoxArea: {
        height: 112,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12
    },

    buttonTake: {
        height: 80,
        width: 80,
        borderRadius: 50,
        backgroundColor: '#FFF'
    }
});

export default CameraComponent;