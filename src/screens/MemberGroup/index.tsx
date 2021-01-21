import Colors from "../../constants/Colors";
import React, { useEffect, useState } from "react";
import { UserService } from "../../service/UserService";
import MemberInterface from "../../interfaces/member.interface";
import { FlatList, RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import Loading from "../../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const MemberGroup: React.FC = () => {
    const [members, setMembers] = useState<MemberInterface[]>([]);
    const userService = new UserService();
    const linkGroupWpp = "https://chat.whatsapp.com/DUKo8O4FOQA1rdc9PJVHTd";

    useFocusEffect(
        React.useCallback(() => {
            getMembers()
        }, [])
    );
    
    useEffect(() => {
        getMembers();
    }, [])

    function getMembers() {
        setLoading(true);

        userService.getAll().then(
            response => {
                setMembers(response.data);
                setLoading(false);
            },
            error => {
                setLoading(false);
                console.error("Erro ak buscar membros");
            }
        )
    }

    const renderItem = (param: any) => {
        const isLastItem = param.index === members.length - 1;
        const member: MemberInterface = param.item;

        return (
            <View style={[styles.item, !isLastItem ? styles.itemSeparator : {}]}>
                <Image
                    style={styles.avatarImage}
                    source={member.image ? { uri: member.image } : require("../../../assets/icons/user.png")}
                />

                <View>
                    <Text style={styles.textDefault}>
                        Nome: {member.name}
                    </Text>

                    <Text style={styles.textDefault}>
                        Peso Inicial: {member.startingWeight}kg
                    </Text>

                    <Text style={styles.textDefault}>
                        Peso Atual: {member.currentWeight || member.startingWeight}kg
                    </Text>
                </View>
            </View>
        );
    };

    const [loading, setLoading] = useState(false);
    if (loading) return <Loading />

    return (
        <View style={styles.container}>
            <RectButton
                style={styles.button}
                onPress={() => Linking.openURL(linkGroupWpp)}
            >
                <Text style={styles.buttonText}>
                    Participe do nosso grupo no WhatsApp {"  "}
                </Text>

                <Icon name="whatsapp" size={28} color={Colors.textLight} />
            </RectButton>

            <FlatList
                data={members}
                renderItem={renderItem}
                keyExtractor={(item) => String(item.id)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    item: {
        padding: 16,
        marginVertical: 1,
        marginHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
    },

    avatarImage: {
        width: 50,
        height: 50,
        marginRight: 24,
        borderRadius: 50,
    },

    textDefault: {
        color: Colors.textLight
    },

    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.colorSuccess,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.colorPrimary,
    },

    button: {
        height: 60,
        overflow: "hidden",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 28,
        backgroundColor: Colors.colorSuccess,
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: Colors.textLight,
        fontSize: 20,
    }
});

export default MemberGroup;