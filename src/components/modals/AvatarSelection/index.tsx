import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { View } from '../../Themed';
import { useAuth } from '../../../contexts/auth';
import GradientButton from '../../GradientButton';
import AlertSnackBar, { ConfigAlertSnackBar } from '../../AlertSnackBar';
import { AvatarService } from '../../../service/AvatarService';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    const [avatarList, setAvatarList] = useState<any[]>([]);
    const [alertSnackBarProp, setAlertSnackBarProp] = useState<ConfigAlertSnackBar>({} as ConfigAlertSnackBar);

    useEffect(() => {
        getAvatar();
    },[])

    async function getAvatar() {
        const responseAvatar = await avatarService.getAll();
        setAvatarList(responseAvatar.data);

        console.log(avatarList);
    }

    function closeModal(result?: any) {
        modalConfigOptions.onCloseModal(result);
        modalConfigOptions.modalizeRef?.current?.close();
    }

    return (
        <>
            <View style={{ ...styles.container, height: "auto" }}>
                <View style={styles.content}>
                    {avatarList.map((avatar, index) => (
                        <View style={styles.buttonArea} key={String(index)}>
                            <TouchableOpacity>
                                <Image
                                    style={styles.avatarImage}
                                    source={avatar.imageUrl ? { uri: avatar.imageUrl } : require("../../../../assets/icons/user.png")}
                                />
                            </TouchableOpacity>

                        </View>
                    ))}


                    {/* <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
                        <GradientButton
                            height={60}
                            width={'100%'}
                            nameIcon="check"
                            title="Salvar Avatar"
                        />
                    </View> */}
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

    content: {
        flex: 1,
        padding: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },

    avatarImage: {
        width:  80,
        height: 80,
        marginRight: 24,
        borderRadius: 50,
    },

    button: {
        margin: 8,
    },

    buttonArea: {
        alignItems: "center",
        marginBottom: 12,
    },
})

export default AvatarSelection;