import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import { returnCurrentMenuMember, MemberMenuInterface } from './fakeResultApi'


const Menu: React.FC = () => {

    const [menuMember, setMenuMember] = useState({} as MemberMenuInterface);

    useEffect(() => {
        const menuFake = returnCurrentMenuMember(); 
        setMenuMember(menuFake);

        console.log(JSON.stringify(menuFake));
    }, [])

    return (
        <View style={styles.container}>
            <Text>{menuMember.menuName}</Text>

            {/* {menuMember.days.map((day, index) => {
                <Text key={String(index)}> {day.dayName} </Text>
            })} */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: Number(StatusBar.currentHeight) + 38,
    },
})

export default Menu;