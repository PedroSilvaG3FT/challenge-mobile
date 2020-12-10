import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';


const MemberGroup: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Member Group Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
})
export default MemberGroup;