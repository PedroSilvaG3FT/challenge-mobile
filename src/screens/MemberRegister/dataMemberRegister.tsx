import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/Colors';
import Input from '../../components/form/input';
import { Form } from '@unform/mobile';
import { Text, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FormHandles, SubmitHandler } from '@unform/core';
import { UserService } from '../../service/UserService';
import { useAuth } from '../../contexts/auth';
import MemberInterface from '../../interfaces/member.interface';


const DataMemberRegister: React.FC = (props: any) => {
    const { signIn } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const userService = new UserService();
    const [currentProps, setProps] = useState<object>({});

    useEffect(() => {
        const params = props.route.params;
        console.log(4, params);
        setProps(params)
    }, [])

    const handleConfirm: SubmitHandler<any> = async (data) => {
        const userDTO: MemberInterface = {
            ...currentProps,
            startingWeight: data.startingWeight,
            height: data.height,
            comments: data.comments.trim()
        } as MemberInterface;

        console.log(userDTO);

        const response = await userService.create(userDTO);

        console.log("RESPONSE :", response.data);
        
        signIn({
            email: userDTO.email,
            password: userDTO.password
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxImage}>
                <Image
                    style={styles.iconImage}
                    source={require("../../../assets/icons/research.png")}
                />

                <Text style={styles.boxImageText}>Quase lá! Precisamos de algumas medidas</Text>
            </View>

            <Form ref={formRef} onSubmit={handleConfirm} style={{ width: "100%" }}>
                <Input name="startingWeight" placeholder="Peso Inicial" keyboardType="decimal-pad"/>
                <Input name="height" placeholder="Altura" keyboardType="number-pad" />

                <Input name="comments" placeholder="Observações" lines={5}/>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => formRef.current?.submitForm()}
                >
                    <Text style={styles.buttonText}>Finalizar Cadastro</Text>
                </TouchableOpacity>
            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 48
    },

    boxImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24
    },

    iconImage: {
        width: 150,
        height: 150,
        marginBottom: 24
    },

    boxImageText: {
        color: "#FFF",
        fontSize: 16
    },

    button: {
        backgroundColor: Colors.colorPrimary,
        height: 50,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontSize: 16,
    },
});
export default DataMemberRegister