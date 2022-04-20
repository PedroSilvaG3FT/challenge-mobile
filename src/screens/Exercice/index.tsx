import { AsyncStorage } from "react-native";
import React, { useEffect, useState } from "react";
import { Image, Linking, StatusBar, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Loading from "../../components/Loading";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { DayExerciseMemberInterface } from "../../interfaces/exercise.interface";
import MemberInterface from "../../interfaces/member.interface";
import { ExerciceUserService } from "../../service/ExerciceUserService";

const Exercice: React.FC = () => {
  const [exerciseMember, setExerciseMember] = useState<
    DayExerciseMemberInterface[]
  >([]);
  const exerciceUserService = new ExerciceUserService();

  useEffect(() => {
    getExerciceUser();
  }, []);

  async function getExerciceUser() {
    setLoading(true);

    let userStorage = (await AsyncStorage.getItem("@EMAuth:user")) as string;
    const storagedUser: MemberInterface = JSON.parse(userStorage);

    exerciceUserService.getById(storagedUser.id as number).then(
      (response) => {
        setExerciseMember(response.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        console.error("Erro ao buscar exercicios do usuário");
      }
    );
  }

  const [loading, setLoading] = useState(false);
  if (loading) return <Loading />;

  if (!exerciseMember.length) {
    return (
      <View style={stylesMenuEmpty.container}>
        <View style={stylesMenuEmpty.boxImage}>
          <Image
            style={stylesMenuEmpty.iconImage}
            source={require("../../../assets/icons/muscle.png")}
          />

          <Text style={stylesMenuEmpty.boxImageText}>
            - Sem Exercícios atribuidos -
          </Text>
          <Text style={stylesMenuEmpty.boxImageText}>
            Solicite ao administrador
          </Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxMenu}>
            {exerciseMember?.map((day, index) => (
              <View style={styles.boxDay} key={String(index)}>
                <Text style={styles.boxMenuLabel}> {day.name} </Text>

                <View style={styles.boxDayContent}>
                  {day.exercices.length ? (
                    <View>
                      {day.exercices.map((exercice, indexExercice) => (
                        <View
                          style={styles.boxMeal}
                          key={String(indexExercice)}
                        >
                          {!exercice.isLink ? (
                            <Text style={styles.textMeal}>
                              &nbsp;&bull; {""}
                              <Text>
                                {" "}
                                {exercice.exercice?.name} {""}
                              </Text>
                              ({exercice.amount})
                            </Text>
                          ) : (
                            <>
                              <TouchableOpacity
                                style={styles.linkButton}
                                onPress={() =>
                                  Linking.openURL(exercice.linkUrl)
                                }
                              >
                                <Text>Clique para assistir</Text>
                              </TouchableOpacity>
                            </>
                          )}
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.boxDayFree}>
                      <Text>- Descanso -</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Number(StatusBar.currentHeight),
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    backgroundColor: "red",
  },

  subTitle: {
    textAlign: "center",
    marginBottom: 16,
  },

  boxMenu: {
    marginVertical: 12,
  },

  boxDay: {
    backgroundColor: Colors.bgDarkSecondary,
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
  },

  boxDayContent: {
    backgroundColor: "transparent",
  },

  boxMenuLabel: {
    fontSize: 24,
    marginBottom: 12,
    paddingBottom: 12,
    textAlign: "center",
    color: Colors.colorPrimary,
  },

  boxMeal: {
    backgroundColor: Colors.bgDarkSecondary,
    minWidth: "100%",
  },

  linkButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    marginVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderColor: Colors.colorDangerLight,
  },

  textMeal: {
    padding: 4,
    color: Colors.colorDangerLight,
  },

  boxDayFree: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

const stylesMenuEmpty = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  boxImage: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  iconImage: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },

  boxImageText: {
    color: "#FFF",
    fontSize: 16,
  },
});

export default Exercice;
