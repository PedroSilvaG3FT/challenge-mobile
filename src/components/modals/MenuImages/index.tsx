import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IHandles } from "react-native-modalize/lib/options";
import Colors from "../../../constants/Colors";
import { DayMenuInterface } from "../../../interfaces/memberMenu.interface";
import { MenuUserService } from "../../../service/MenuUserService";
import CameraComponent from "../../Camera";
import { Text, View } from "../../Themed";
import { Feather as Icon } from "@expo/vector-icons";
import { useAuth } from "../../../contexts/auth";
import Loading from "../../Loading";
interface ModalImagesProps {
  modalRef?: React.RefObject<IHandles>;
  onCloseModal?: any;
  modalConfigOptions: any;
  height?: number;
}

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
  }, []);

  function closeModal(result?: any) {
    modalConfigOptions.onCloseModal(result);
    modalConfigOptions.modalizeRef?.current?.close();
  }

  function saveImageItem(itemImage: any) {
    setLoading(true);

    menuUserService.updateImage(itemImage).then(
      (response) => {
        setItemSelected(0);
        setLoading(false);
        closeModal();
      },
      (error) => {
        setLoading(false);
        console.error("Erro ao salvar imagem");
      }
    );
  }

  function openCamera(item: any) {
    setItemSelected(item.menuItemId);
    setShowCamera(true);
  }

  function _colorFeedbackRating(rating: number): string {
    const colors: { [key: number]: any } = {
      1: Colors.colorDanger,
      2: Colors.colorDangerLight,
      3: Colors.colorSuccess,
    };

    return colors[rating];
  }

  function _LabelFeedbackRating(rating: number): string {
    const colors: { [key: number]: any } = {
      1: "Reprovado",
      2: "Ok",
      3: "Exelente",
    };

    return colors[rating];
  }

  function _iconFeedbackRating(rating: number): string {
    const colors: { [key: number]: any } = {
      1: "frown",
      2: "smile",
      3: "smile",
    };

    return colors[rating];
  }

  const onCloseCamera = (result: any) => {
    setShowCamera(false);

    if (!result) return;

    const newItemImage = {
      userId: user?.id,
      menuItemId: itemSelected,
      image64: result,
    };

    saveImageItem(newItemImage);
  };

  if (loading) return <Loading />;

  return (
    <>
      <View
        style={{
          ...styles.container,
          height: modalConfigOptions.height || "auto",
        }}
      >
        <ScrollView>
          <Text style={styles.title}>Refeições de {day.dayName}</Text>

          {day?.meals?.map((meal, index) => (
            <View style={styles.mealBox} key={index}>
              {meal.imageItem ? (
                <View style={styles._row}>
                  <TouchableOpacity
                    style={styles._imageBox}
                    onPress={() => openCamera(meal)}
                  >
                    <Image
                      style={styles._image}
                      source={{ uri: `${meal.imageItem}` }}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      ...styles._contentImage,
                      borderColor: _colorFeedbackRating(meal.rating || 3),
                    }}
                  >
                    {meal.rating ? (
                      <View style={styles._labelImageRating}>
                        <Icon
                          size={24}
                          name={_iconFeedbackRating(meal.rating)}
                          color={_colorFeedbackRating(meal.rating)}
                        />
                        <Text
                          style={{ color: _colorFeedbackRating(meal.rating) }}
                        >
                          {"    "}
                          {_LabelFeedbackRating(meal.rating)}
                        </Text>
                      </View>
                    ) : null}
                    <Text>
                      {meal.feedback ? (
                        <Text
                          style={{
                            color: _colorFeedbackRating(meal.rating || 3),
                          }}
                        >
                          Feedback:
                          {"  "}
                        </Text>
                      ) : (
                        <Text>Sua imagem enviada com sucesso</Text>
                      )}
                      {meal.feedback}
                    </Text>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles._buttonAdd}
                  onPress={() => openCamera(meal)}
                >
                  <Icon name="camera" size={44} color="#FFFFF0" />
                  <Text>Adicionar Imagem</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <CameraComponent visible={showCamera} onClose={onCloseCamera} />
    </>
  );
};

const styles = StyleSheet.create({
  _row: {
    padding: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "transparent",
  },

  _imageBox: {
    width: 80,
    height: 120,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  _image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 8,
  },

  _boxAddImage: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.colorDanger,
  },

  _contentImage: {
    flexGrow: 1,
    borderWidth: 1,
    maxHeight: 120,
    borderRadius: 12,
    paddingHorizontal: 12,

    marginLeft: 14,
    maxWidth: "74%",
    alignSelf: "stretch",
    justifyContent: "center",
  },

  _labelImageRating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  _buttonAdd: {
    backgroundColor: Colors.colorDanger,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 12,
  },

  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgDarkSecondary,
  },

  title: {
    fontSize: 26,
    marginBottom: 12,
  },

  mealBox: {
    marginBottom: 16,
    backgroundColor: Colors.bgDarkSecondary,
    marginVertical: 4,
    paddingVertical: 16,
    borderRadius: 8,
  },
});

export default MenuImagesModal;
