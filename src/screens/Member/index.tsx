import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, StatusBar, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import GradientButton from '../../components/GradientButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import MemberInterface from '../../interfaces/member.interface'
import { UserService } from '../../service/UserService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { differenceInDays } from 'date-fns';

const wait = (timeout: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Member: React.FC = () => {
    const navigation = useNavigation();
    const userService = new UserService();
    const [user, setUser] = useState<MemberInterface>({} as MemberInterface);
    const [refreshing, setRefreshing] = useState(false);

    const [currentDay, setCurrentDay] = useState<number>(0);
    const [remainingGoalWeek, setRemainingGoalWeek] = useState<number | undefined>(0);
    const [remainingGoalWeight, setRemainingGoalWeight] = useState<number | undefined>(0);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);
    
    useEffect(() => {
        getUserInfo()
    },[])
    
    async function getUserInfo() {
        let userStorage = await AsyncStorage.getItem("@EMAuth:user") as string;
        const storagedUser: MemberInterface = JSON.parse(userStorage);
        userService.getById(storagedUser.id as number).then(
            response => {
                const res = response.data; 
                setUser(res);
                
                setRemainingGoalWeek(res.currentWeight - res.goalWeek);
                setRemainingGoalWeight(res.currentWeight - res.goalWeight);

                const _initalDay =  new Date(res.dateCreation);
                const _currentDay = new Date();
                const days = differenceInDays(_currentDay, _initalDay);

                setCurrentDay(days);
            },
            error => console.log("ERROR :", error)
        );
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.centerAlignItems}>
                        <Text style={styles.goalText}>Meta</Text>
                        <Text>(Semana)</Text>
                        <Text style={styles.goalWeight}> 
                            {user.goalWeek ? `${user.goalWeek}Kg` : 'n/A'}
                        </Text>
                    </View>

                    <View style={styles.centerAlignItems}>
                        <Image
                            style={styles.avatarImage}
                            source={{
                                uri: 'https://pickaface.net/gallery/avatar/unr_guihteste_180521_0137_2av4wpi.png',
                            }}
                        />

                        <Text>Olá {user?.name?.split(" ")[0]}, o seu peso atual é</Text>
                        <Text style={styles.currentWeightText}>
                            {user.currentWeight ? `${user.currentWeight}Kg` : 'n/A'}
                        </Text>
                    </View>

                    <View style={styles.centerAlignItems}>
                        <Text style={[styles.goalText, { color: Colors.colorDanger }]}>Meta</Text>
                        <Text>(Final)</Text>
                        <Text style={styles.goalWeight}> 
                            {user.goalWeight ? `${user.goalWeight}Kg` : 'n/A'}
                        </Text>
                    </View>
                </View>

                <GradientButton
                    title="Cardapio"
                    nameIcon="food-fork-drink"
                    width={"auto"}
                    height={60}
                    onPress={() => navigation.navigate('MenuScreen')}
                />

                <GradientButton
                    title="Exercicios"
                    nameIcon="run-fast"
                    width={"auto"}
                    height={60}
                    onPress={() => navigation.navigate('ExerciceScreen')}
                />

                <GradientButton
                    title="Meu Historico"
                    nameIcon="history"
                    width={"auto"}
                    height={60}
                />

                <GradientButton
                    title="Meu Perfil"
                    nameIcon="account-details"
                    width={"auto"}
                    height={60}
                    onPress={() => navigation.navigate('ProfileScreen')}
                />

                <View style={styles.summaryBox}>
                    <Text style={styles.summaryLabel}> Resumo </Text>

                    <View style={styles.summaryItemsBox}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryItemLabel}> Dia </Text>
                            <Text style={[styles.summaryItemValue, { color: Colors.colorPrimary }]}> 
                                {currentDay}
                            </Text>
                            <Text style={styles.summaryItemLabel}> de 90 </Text>
                        </View>

                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryItemLabel}> Restam </Text>
                            <Text style={[styles.summaryItemValue, , { color: Colors.colorDangerLight }]}> 
                                {remainingGoalWeek}Kg
                            </Text>
                            <Text style={styles.summaryItemLabel}> Para a meta da semana </Text>
                        </View>

                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryItemLabel}> Restam </Text>
                            <Text style={[styles.summaryItemValue, , { color: Colors.colorDanger }]}>
                                {remainingGoalWeight}Kg
                            </Text>
                            <Text style={styles.summaryItemLabel}> Para a meta Final </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: Number(StatusBar.currentHeight) + 38
    },

    header: {
        marginBottom: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    centerAlignItems: {
        alignItems: 'center',
    },

    avatarImage: {
        width: 100,
        height: 100,
        marginBottom: 8,
        borderRadius: 50,
    },

    currentWeightText: {
        color: Colors.colorPrimary,
        fontSize: 28
    },

    goalText: {
        fontSize: 20,
        fontWeight: "bold",
        color: Colors.colorDangerLight
    },

    goalWeight: {
        fontSize: 24,
    },

    summaryBox: {
        marginTop: 12,
        marginHorizontal: 8,
        backgroundColor: Colors.bgDarkSecondary,
        borderRadius: 12,
        padding: 12,
        flex: 1,
    },

    summaryLabel: {
        fontSize: 16,
        marginBottom: 16
    },

    summaryItemsBox: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
    },

    summaryItem: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: 108,
        padding: 8,
        borderRadius: 8,
        marginHorizontal: 8
    },

    summaryItemLabel: {
        textAlign: 'center'
    },

    summaryItemValue: {
        fontSize: 28,
        textAlign: 'center',
        justifyContent: 'center'
    },
})

export default Member;