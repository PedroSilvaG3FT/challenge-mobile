import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

const TipsNews: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Tips News Page</Text>
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
export default TipsNews;