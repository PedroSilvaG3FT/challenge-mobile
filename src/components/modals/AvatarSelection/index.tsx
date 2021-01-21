import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { View } from '../../Themed';
import { useAuth } from '../../../contexts/auth';
import GradientButton from '../../GradientButton';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../AlertSnackBar';
import { AvatarService } from '../../../service/AvatarService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { UserService } from '../../../service/UserService';

interface ModalAvatarProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any,
    height?: number,
};

const AvatarSelection: React.FC<ModalAvatarProps> = (props) => {
    const { user } = useAuth();
    const { modalConfigOptions } = props;

    const avatarService = new AvatarService();
    const userService = new UserService();
    
    const [avatarList, setAvatarList] = useState<any[]>([]);
    const [avatarSelected, setAvatarSelected] = useState(0);
    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

    useEffect(() => {
        getAvatar();
    }, [])

    async function getAvatar() {
        const responseAvatar = await avatarService.getAll();
        setAvatarList(responseAvatar.data);
    }

    function closeModal(result?: any) {
        modalConfigOptions.onCloseModal(null);
        modalConfigOptions.modalizeRef?.current?.close();
    }

    function saveImageUser() {
        const avatar = avatarList.find(avatar => avatar.numberImage === avatarSelected);
        const updateImageDTO = {
            id: user.id,
            image: avatar.imageUrl
        };

        userService.update(updateImageDTO).then(
            response => {
                closeModal()
            },
            error => {
                console.error("Erro ao atualizar imagem de usuario")
            }
        )
    }

    return (
        <>
            <View style={{ ...styles.container, height: "auto" }}>
                <View style={styles.actionBox}>
                    <TouchableOpacity style={{ ...styles.button, backgroundColor: Colors.colorDanger }} onPress={() => closeModal()}>
                        <Icon name="close" size={24} color={Colors.textLight} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => saveImageUser()}>
                        <Icon name="check" size={24} color={Colors.textLight} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    {avatarList.map((avatar, index) => (

                        <View style={styles.buttonArea} key={String(index)}>
                            <TouchableOpacity onPress={() => setAvatarSelected(avatar.numberImage)}>
                                <Image
                                    style={[
                                        styles.avatarImage,
                                        avatarSelected === avatar.numberImage ? styles.avatarSelected : {}
                                    ]}
                                    source={avatar.imageUrl ? { uri: avatar.imageUrl } : require("../../../../assets/icons/user.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </View>

            <AlertSnackBar config={alertSnackBarProp} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgDarkSecondary
    },

    actionBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        backgroundColor: Colors.bgDarkSecondary,
        padding: 12
    },

    button: {
        flex: 1,
        height: 60,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 28,
        borderRadius: 8,
        backgroundColor: Colors.colorSuccess,
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: Colors.textLight,
        fontSize: 20,
    },

    content: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: Colors.bgDarkSecondary
    },

    avatarImage: {
        width: 80,
        height: 80,
        marginRight: 24,
        borderRadius: 50,
    },

    avatarSelected: {
        borderWidth: 8,
        borderColor: Colors.textLight
    },

    buttonArea: {
        alignItems: "center",
        marginBottom: 12,
        backgroundColor: Colors.bgDarkSecondary

    },
})

export default AvatarSelection;