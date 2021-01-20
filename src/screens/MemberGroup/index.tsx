import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { UserService } from "../../service/UserService";
import MemberInterface from "../../interfaces/member.interface";

const MemberGroup: React.FC = () => {
    const [members, setMembers] = useState<MemberInterface[]>([]);
    const userService = new UserService();

    useEffect(() => {
        getMembers();
    },[])

    function getMembers() {
        userService.getAll().then(
            response => {
                setMembers(response.data)
            },
            error => {
                console.log("ERROR :", error);
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
                    source={member.image ? {uri: member.image} : require("../../../assets/icons/user.png")}
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

    return (
        <View style={styles.container}>
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
        // justifyContent: "space-between",
    },

    avatarImage: {
        width:  50,
        height: 50,
        marginRight: 24,
        borderRadius: 50,
    },

    textDefault: {
        color: Colors.textLight
    },

    itemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.colorPrimary,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.colorPrimary,
    },

    musicText: {
        width: 200,
    },
});

export default MemberGroup;