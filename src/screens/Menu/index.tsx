import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import GradientButton from '../../components/GradientButton';
import MenuImagesModal from '../../components/modals/MenuImages';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import MemberInterface from '../../interfaces/member.interface';
import { MemberMenuInterface } from '../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../service/MenuUserService';

const Menu: React.FC = () => {
    const [menuMember, setMenuMember] = useState({} as MemberMenuInterface);
    const windowHeight = Dimensions.get("window").height;
    const menuUserService = new MenuUserService();
    const modalizeRef = useRef<Modalize>(null);

    const modalConfigOptions = {
        modalizeRef: modalizeRef,
        onCloseModal: onCloseModal,
        dataParam: {},
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

    function getCurrentDay() {
        const currentDate = new Date();
        const currentDayId = currentDate.getDay() + 1;
        const daysById = menuMember.days.filter(day => day.dayId === currentDayId);
    }

    if (!menuMember) {
        return (
            <View>
                <Text>- Sem Cardapio atribuido -</Text>
            </View>
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

export default Menu;