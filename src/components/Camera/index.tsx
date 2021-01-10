import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import PreviewImage from './previewImage';

interface CameraProps {
    visible: boolean;
    onClose?: any;
}

const CameraComponent: React.FC<CameraProps> = (props) => {
    const cameraRef = useRef<any>(null);

    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(true);
    const [capturedImage, setCapturedImage] = useState<any>(null);
    const [showModalPreview, setModalPreview] = useState(false);

    useEffect(() => {
        if(!props.visible) return;
        
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [props.visible])

    if (hasPermission === null) {
        console.log("PERMISSION NULL");
        return <View />;
    }
    if (hasPermission === false) {
        console.log("PERMISSION FALSE");
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

        const data = await cameraRef.current.takePictureAsync({ base64: true });
        setCapturedImage(data);
        setModalPreview(true)
    }

    function resultModal() {
        setModalPreview(false);
        return capturedImage.base64;
    }

    const resultPreview = (resultPreview: any) => {
        const { acceptImage } = resultPreview;

        if (!acceptImage) {
            setModalPreview(false);
            return;
        }

        const result = resultModal();
        props.onClose(result);
    };

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
                >
                    <PreviewImage imageUri={capturedImage.uri} onSelectResult={resultPreview} />
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
        height: 144,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 40,
        backgroundColor: "#000000a0",
        justifyContent: 'space-between',

        borderTopLeftRadius:  12,
        borderTopRightRadius: 12,
    },
});

export default CameraComponent;