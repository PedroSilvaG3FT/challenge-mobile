import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../constants/Colors';
import { StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface GradientButtonProps {
    title?: string;
    colors?: string[];
    style?: object;
    width?: number | string;
    height?: number | string;
    borderRadius?: number;
    sizeIcon?: number;
    nameIcon?: string;
    colorIcon?: string;
    image?: string | null;
    onPress?: any;
}

const GradientButton: React.FC<GradientButtonProps> = (props) => {
    const dataButton = {
        title: props.title,
        width: props.width,
        height: props.height,
        style: props.style,
        colors: props.colors?.length ? props.colors : [Colors.colorPrimary, Colors.colorDanger],
        sizeIcon: props.sizeIcon ? props.sizeIcon : 24,
        borderRadius: props.borderRadius ? props.borderRadius : 12,
        colorIcon: props.colorIcon ? props.colorIcon : Colors.colorPrimary,
        nameIcon: props.nameIcon,
        image: props.image,
        onPress: props.onPress,
    };

    const sizeButtonStyle = {
        width: dataButton.width,
        height: dataButton.height
    };

    const borderRadiusStyle = {
        borderRadius: dataButton.borderRadius
    }

    const stylesGroup = [
        sizeButtonStyle,
        dataButton.style,
        styles.buttonGradient,
        borderRadiusStyle
    ]

    return (
        <RectButton style={stylesGroup} onPress={dataButton.onPress}>
            <LinearGradient
                colors={dataButton.colors}
                style={[styles.buttonContent, borderRadiusStyle, { height: dataButton.height }]}
                start={[0, 1]}
                end={[1, 0]}
            >
                {dataButton.title ?
                    <Text style={styles.buttonText}> {dataButton.title} </Text>
                    : null
                }

                {dataButton.nameIcon ?
                    <Icon name={dataButton.nameIcon || ""} size={24} color="#FFFFF0" /> :
                    null
                }
            </LinearGradient>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    buttonGradient: {
        margin: 8
    },

    buttonContent: {
        padding: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    buttonText: {
        fontSize: 16,
        color: '#FFFFF0'
    }
})

export default GradientButton;