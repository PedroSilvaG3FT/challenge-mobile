import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { DayExerciseMemberInterface } from '../../interfaces/exercise.interface';
import MemberInterface from '../../interfaces/member.interface';
import { ExerciceUserService } from '../../service/ExerciceUserService';

const Exercice: React.FC = () => {
    const [exerciseMember, setExerciseMember] = useState<DayExerciseMemberInterface[]>([]);
    const exerciceUserService = new ExerciceUserService();

    useEffect(() => {
        getExerciceUser();
    }, [])

    async function getExerciceUser() {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);

        exerciceUserService.getById(storagedUser.id as number).then(
            response => {
                setExerciseMember(response.data)
            },
            error => console.log("ERROR :", error)
        )
    }

    if (!exerciseMember) {
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

                    <View style={styles.boxMenu}>
                        {exerciseMember?.map((day, index) => (
                            <View style={styles.boxDay} key={String(index)}>
                                <Text style={styles.boxMenuLabel}> {day.name} </Text>

                                <View style={styles.boxDayContent}>
                                    {day.exercices.length ?
                                        <View>
                                            {day.exercices.map((exercice, indexExercice) => (
                                                <View style={styles.boxMeal} key={String(indexExercice)}>
                                                    <Text style={styles.textMeal}>
                                                        &nbsp;&bull; {""}
                                                        <Text> {exercice.exercice?.name} {""}</Text>
                                                        ({exercice.amount} Repetições)
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                        :
                                        <View style={styles.boxDayFree}>
                                            <Text style={styles.textDayFree}>- Descanso -</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                        ))}
                    </View>

                </View>
            </ScrollView>

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
        fontSize: 16,
    },

    boxMeal: {
        backgroundColor: Colors.bgDarkSecondary,
    },

    textMeal: {
        padding: 4,
        color: Colors.colorDangerLight,
    },

    boxDayFree: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },

    textDayFree: {
    }

})

export default Exercice;