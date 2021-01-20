import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { DayMenuInterface } from '../../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../../service/MenuUserService';
import CameraComponent from '../../Camera';
import { Text, View } from '../../Themed';
import { Feather as Icon } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/auth';
import { ActivityIndicator } from 'react-native-paper';
import Loading from '../../Loading';

interface ModalImagesProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any,
    height?: number,
};

const MenuImagesModal: React.FC<ModalImagesProps> = (props) => {
    const { user } = useAuth();
    const { modalConfigOptions } = props;
    const [showCamera, setShowCamera] = useState(false);
    const [itemSelected, setItemSelected] = useState<number>(0);
    const [day, setDay] = useState<DayMenuInterface>({} as DayMenuInterface);
    
    const [loading, setLoading] = useState(false);
    const menuUserService = new MenuUserService();

    useEffect(() => {
        if (modalConfigOptions.data) {
            setDay(modalConfigOptions.data);
        }
    }, [])

    function closeModal(result?: any) {
        modalConfigOptions.onCloseModal(result);
        modalConfigOptions.modalizeRef?.current?.close();
    }

    function saveImageItem(itemImage: any) {
        setLoading(true);
        
        menuUserService.update(itemImage).then(
            response => {
                setItemSelected(0);
                setLoading(false);
                closeModal();
            },
            error => {
                setLoading(false); 
                console.error("Erro ao salvar imagem")
            }
        )
    }

    function openCamera(item: any) {
        setItemSelected(item.menuItemId);
        setShowCamera(true)
    }

    const onCloseCamera = (result: any) => {
        setShowCamera(false);

        if (!result) return;

        const newItemImage = {
            userId: user?.id,
            menuItemId: itemSelected,
            image64: result
        };

        saveImageItem(newItemImage);
    };


    if (loading) return <Loading />
    
    return (
        <>
            <View style={{ ...styles.container, height: modalConfigOptions.height || "auto" }}>
                <ScrollView>
                    <Text style={styles.title}>Refeições de {day.dayName}</Text>

                    {day?.meals?.map((meal, index) => (
                        <View style={styles.mealBox} key={index}>

                            <View style={styles.boxLabelImage}>
                                <Text style={styles.labelImage}>
                                    {meal.typeMealName}
                                    {"  "}
                                    {meal.rating ? (
                                        <Text style={{
                                            ...styles.labelImageRating,
                                            color: meal.rating == 1 ? Colors.colorDanger : (meal.rating == 2 ? Colors.colorDangerLight : Colors.colorSuccess)
                                        }}>
                                            {meal.rating == 1 ? "Reprovado" : (meal.rating == 2 ? "Ok" : "Exelente")}{"  "}
                                            <Icon
                                                size={24}
                                                name={meal.rating == 1 ? "frown" : (meal.rating == 2 ? "smile" : "smile")}
                                                color={meal.rating == 1 ? Colors.colorDanger : (meal.rating == 2 ? Colors.colorDangerLight : Colors.colorSuccess)}
                                            />
                                        </Text>
                                    ) : null}
                                </Text>

                            </View>

                            <TouchableOpacity
                                style={[styles.imageBox, meal.imageItem ? { backgroundColor: 'transparent' } : {}]}
                                onPress={() => openCamera(meal)}
                            >
                                {meal.imageItem ? (
                                    <Image
                                        style={styles.image}
                                        source={{ uri: `${meal.imageItem}` }}
                                    />
                                ) :
                                    <View style={styles.boxAddImage}>
                                        <Icon name="camera" size={44} color="#FFFFF0" />
                                        <Text>Adicionar Imagem</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <CameraComponent
                visible={showCamera}
                onClose={onCloseCamera}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: Colors.bgDarkSecondary
    },

    title: {
        fontSize: 26,
        marginBottom: 12
    },

    mealBox: {
        marginBottom: 16,
        backgroundColor: Colors.bgDarkSecondary,
        marginVertical: 4,
        padding: 16,
        borderRadius: 8,
    },

    boxLabelImage: {
        marginVertical: 12,
        backgroundColor: 'transparent',
    },

    labelImage: {
        justifyContent: 'center',
        textAlign: 'center',
    },

    labelImageRating: {
        paddingVertical: 30,
    },

    imageBox: {
        maxHeight: 300,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.colorDanger
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    boxAddImage: {
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: 'transparent',
    }

})

export default MenuImagesModal;