import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IHandles } from 'react-native-modalize/lib/options';
import Colors from '../../../constants/Colors';
import { DayMenuInterface, MealInterface } from '../../../interfaces/memberMenu.interface';
import { MenuUserService } from '../../../service/MenuUserService';
import CameraComponent from '../../Camera';
import { Text, View } from '../../Themed';

interface ModalImagesProps {
    modalRef?: React.RefObject<IHandles>,
    onCloseModal?: any,
    modalConfigOptions: any,
    height?: number,
};

const MenuImagesModal: React.FC<ModalImagesProps> = (props) => {
    const { modalConfigOptions } = props;
    const [showCamera, setShowCamera] = useState(false);
    const [day, setDay] = useState<DayMenuInterface>({} as DayMenuInterface);
    const [itemSelected, setItemSelected] = useState<MealInterface | null>(null);

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

    function saveImageItem(file: File) {
        menuUserService.update(file, Number(itemSelected?.menuItemId)).then(
            response => {
                setItemSelected(null)
                // console.log(response.data)
            },
            error => {
                // console.log("Deu ruim");
            }
        )
    }

    function openCamera(item: any) {
        setItemSelected(item);
        setShowCamera(true)
    }

    const onCloseCamera = (result: any) => {
        setShowCamera(false);

        if(!result) return;

        const newItem = {
            menuItemId: itemSelected?.menuItemId,
            imageItem: result
        } as MealInterface;
        
        saveImageItem(result);
    };

    return (
        <>
            <View style={{ ...styles.container, height: modalConfigOptions.height || "auto" }}>
                <Text style={styles.title}>Refeições de {day.dayName}</Text>

                {day?.meals?.map((meal, index) => (
                    <View style={styles.mealBox} key={index}>
                        <Text>{meal.typeMealName}</Text>

                        <TouchableOpacity style={styles.imageBox} onPress={() => openCamera(meal)}>

                        </TouchableOpacity>
                    </View>
                ))}
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

    imageBox: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: Colors.colorSuccess
    },

})

export default MenuImagesModal;