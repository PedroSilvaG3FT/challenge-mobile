import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import GradientButton from '../../components/GradientButton';
import MenuImagesModal from '../../components/modals/MenuImages';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import MemberInterface from '../../interfaces/member.interface';
import { MemberMenuInterface, DayMenuInterface, MealInterface } from '../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../service/MenuUserService';

const Menu: React.FC = () => {
    const [menuMember, setMenuMember] = useState({} as MemberMenuInterface);
    const windowHeight = Dimensions.get("window").height;
    const menuUserService = new MenuUserService();
    const modalizeRef = useRef<Modalize>(null);

    const modalConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: onCloseModal,
        height: windowHeight - 130,
        data: {}
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

    const onOpen = (day: DayMenuInterface) => {
        modalConfigOptions.data = day;
        modalizeRef.current?.open();
    };

    function onCloseModal() { }

    if (!menuMember.days) {
        return (
            <>
                <View style={stylesMenuEmpty.container}>
                    <View style={stylesMenuEmpty.boxImage}>
                        <Image
                            style={stylesMenuEmpty.iconImage}
                            source={require("../../../assets/icons/real-food.png")}
                        />

                        <Text style={stylesMenuEmpty.boxImageText}>- Sem Cardapio atribuido -</Text>
                        <Text style={stylesMenuEmpty.boxImageText}>Solicite ao administrador</Text>
                    </View>
                </View>
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

                                <View style={styles.boxDayContainer}>
                                    <View style={styles.boxDayContent}>
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
                                        onPress={() => onOpen(day)}
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
                snapPoint={modalConfigOptions.height - 100}
                modalHeight={modalConfigOptions.height}

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

    boxDayContainer: {
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
    },

    boxDayContent: {
        flex: 1
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