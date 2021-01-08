import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import Colors from '../../constants/Colors';

interface AlertSnackBarProps {
    config: ConfigAlertSnackBar
}

export interface ConfigAlertSnackBar {
    message: string,
    type: 'success' | 'warn' | 'error',
    duration?: number
}

const AlertSnackBar: React.FC<AlertSnackBarProps> = (props) => {
    const [visible, setVisible] = useState(true);
    const [color, setColor] = useState("");

    useEffect(() => {
        if (props.config.message) {
            setStyleMessage()
            setVisible(true);
        }

        setTimeout(() => {
            setVisible(false)
        }, props.config.duration || 5000)

    }, [props.config])

    function setStyleMessage() {
        const type = props.config.type;

        if (type === 'success') setColor(Colors.colorSuccess);
        if (type === 'warn') setColor(Colors.colorDangerLight);
        if (type === 'error') setColor(Colors.colorDanger);
    }

    return (
        <Snackbar
            visible={visible}
            onDismiss={() => { }}
            style={[styles.container, { backgroundColor: color}]}
        >
            <Text>{props.config.message}</Text>
        </Snackbar>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
    },
})

export default AlertSnackBar;