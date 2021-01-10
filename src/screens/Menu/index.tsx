import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import GradientButton from '../../components/GradientButton';
import MenuImagesModal from '../../components/modals/MenuImages';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import MemberInterface from '../../interfaces/member.interface';
import { MemberMenuInterface } from '../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../service/MenuUserService';

import CameraComponent from '../../components/Camera';

const Menu: React.FC = () => {
    const [menuMember, setMenuMember] = useState({} as MemberMenuInterface);
    const windowHeight = Dimensions.get("window").height;
    const menuUserService = new MenuUserService();
    const modalizeRef = useRef<Modalize>(null);
    const navigation = useNavigation();

    const [showCamera, setShowCamera] = useState(false);

    const modalConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: onCloseModal,
        dataParam: {},
        height: windowHeight / 2
    };

    useEffect(() => {
        getMenuUser();
    }, [])

    async function getMenuUser() {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);

        menuUserService.getById(storagedUser.id as number).then(
            response => setMenuMember(response.data),
            error => console.log("ERROR :", error)
        )
    }

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    function onCloseModal() { }

    const onCloseCamera = (result: any) => {
        console.log(result);
        setShowCamera(false)
    };

    if (!menuMember.days) {
        return (
            <>
                <View style={stylesMenuEmpty.container}>
                    <View style={stylesMenuEmpty.boxImage}>
                        <Image
                            style={stylesMenuEmpty.iconImage}
                            source={require("../../../assets/icons/real-food.png")}
                        />

                        <TouchableOpacity onPress={() => setShowCamera(true)}>
                            <Text style={stylesMenuEmpty.boxImageText}>- Sem Cardapio atribuido -</Text>
                            <Text style={stylesMenuEmpty.boxImageText}>Solicite ao administrador</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CameraComponent 
                    visible={showCamera} 
                    onClose={onCloseCamera}
                />

            </>
        )
    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.title}>{menuMember.menuName}</Text>
                    <Text style={styles.subTitle}>
                        (Periodo: {menuMember.qtdDays} Dias)
                    </Text>

                    <View style={styles.boxMenu}>
                        {menuMember?.days?.map((day, index) => (
                            <View style={styles.boxDay} key={String(index)}>
                                <Text style={styles.boxMenuLabel}> {day.dayName} </Text>

                                <View style={styles.boxDayContent}>
                                    <View>
                                        {day.meals.map((meals, indexMeal) => (
                                            <View style={styles.boxMeal} key={String(indexMeal)}>
                                                <Text style={styles.textMeal}>
                                                    &nbsp;&bull; {""}
                                                    <Text style={styles.textMealLabel}>{meals.typeMealName}: {""}</Text>
                                                    {meals.descripition}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>

                                    <GradientButton
                                        height={80}
                                        onPress={() => onOpen()}
                                        nameIcon="camera-enhance-outline"
                                        colors={[Colors.colorDanger, Colors.colorDangerLight]}
                                    />
                                </View>
                            </View>
                        ))}
                    </View>

                </View>
            </ScrollView>

            <Modalize
                ref={modalizeRef}
                snapPoint={windowHeight / 2}
                modalHeight={windowHeight - 130}

            >
                <MenuImagesModal modalConfigOptions={modalConfigOptions} />
            </Modalize>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Number(StatusBar.currentHeight),
        paddingHorizontal: 18
    },

    title: {
        fontSize: 28,
        textAlign: 'center',
    },

    subTitle: {
        textAlign: 'center',
        marginBottom: 16
    },

    boxMenu: {
        marginVertical: 12,
    },

    boxDay: {
        backgroundColor: Colors.bgDarkSecondary,
        marginVertical: 4,
        padding: 16,
        borderRadius: 8,
    },

    boxDayContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    boxMenuLabel: {
        marginBottom: 8,
        color: Colors.colorPrimary,
        fontSize: 16
    },

    boxMeal: {
        backgroundColor: Colors.bgDarkSecondary,
    },

    textMeal: {
        padding: 4
    },

    textMealLabel: {
        color: Colors.colorDangerLight,
    }

})

const stylesMenuEmpty = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },

    iconImage: {
        width: 150,
        height: 150,
        marginBottom: 24
    },

    boxImageText: {
        color: "#FFF",
        fontSize: 16
    },
});

export default Menu;