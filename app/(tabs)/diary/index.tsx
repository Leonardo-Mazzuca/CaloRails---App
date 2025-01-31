import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Title from "@/components/title";
import BackButton from "@/components/back-button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { addDays, format, isSameDay, isTomorrow, isYesterday } from "date-fns";
import { mealsEnum } from "@/constants";
import { useUser } from "@/hooks/useUser";
import LoadingPage from "@/components/loading-page";
import MealItem from "@/components/meal-item";
import { useMeal } from "@/hooks/useMeal";
import { router } from "expo-router";

const DirectionalButton = ({
  dir,
  onPress,
}: {
  dir: "left" | "right";
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {dir === "left" ? (
        <MaterialIcons name="keyboard-arrow-left" size={32} color="black" />
      ) : (
        <MaterialIcons name="keyboard-arrow-right" size={32} color="black" />
      )}
    </TouchableOpacity>
  );
};

const NumberItem = ({
  num,
  label,
}: {
  num: string;
  label: string;
}) => {
  return (
    <View className="flex-1 flex-row items-center">
      <View className="items-center mx-auto">
        <Text className="text-lg font-semibold text-gray-800">{num}</Text>

        <Text className="text-gray-600 mx-auto font-normal ml-1">{label}</Text>
      </View>
    </View>
  );
};

const Diary = () => {
  
  const today = new Date();

  const {createMeals, getMeals, isFetchingMeals,totalCalories, getTotalCalories} = useMeal();

  const [meals, setMeals] = useState<Meal[]>([])

  const [remainCalories, setRemainCalories] = useState(0)


  const { user, isLoading } = useUser();

  const [currentDate, setcurrentDate] = useState<Date>(today);

  const handlePrevDay = () => {
    setcurrentDate(addDays(currentDate, -1));
  };

  const handleNextDay = () => {
    setcurrentDate(addDays(currentDate, +1));
  };

  useEffect(()=> {

    const mealsArray = Object.values(mealsEnum).map((meal) => ({
      total_calories: 0,
      date: currentDate.toISOString(),
      meal_type: meal
    }))

    const makeMeals = async () => {

        for(const meal of mealsArray) {
    
          const {error} = await createMeals(meal)

          if(error) {
            Alert.alert(error)
          }

        }
    }

    makeMeals()

  },[mealsEnum])

  useEffect(()=> {

    // ? mapear refeições diárias pela data de criação sendo igual a hoje.

    const fetchMeals = async () => {


      const {data,error} = await getMeals(format(currentDate, "yyyy-MM-dd"));

      if(data) {
        setMeals(data)
      } else {
        Alert.alert(error!)
      }

    }

    fetchMeals();

  },[currentDate])

  useEffect(()=> {

    if(totalCalories > 0) {

      const remain = user?.total_calories - totalCalories
  
      setRemainCalories(remain)
    } else {
      setRemainCalories(user.total_calories)
    }

  },[totalCalories, user.total_calories])

  useEffect(()=> {

    getTotalCalories(format(currentDate, "yyyy-MM-dd"))

  },[currentDate])

  const animatedValue = useRef(new Animated.Value(0)).current

  const finishDiary = () => {

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: false, 
    }).start(()=> {
      router.replace('/(diary)/success')
    });


  };


  if (isLoading || isFetchingMeals) {
    return <LoadingPage />;
  }



  return (
    
    <SafeAreaView className="h-full flex-1">


        <FlatList
          className="mb-12"
          data={[{ key: "1" }]}
          keyExtractor={(item) => item.key}
          renderItem={() => (

            <View>

              {meals?.map((meal, index) => (

                  <MealItem
                    key={index} 
                    meal={meal}
                  />
  
                ))}

            </View>

          )}
          ListHeaderComponent={() => (
            <View>

              <View className="flex-row items-center gap-2 p-3">
                <BackButton />
                <Title title="Diário" />
              </View>

              <View 
                style={{borderBottomWidth:1, borderBottomColor: '#dedede'}}
                className="flex-row items-center justify-between my-2 pb-3"
              >
                <DirectionalButton onPress={handlePrevDay} dir="left" />

                <Text className="text-lg text-gray-600 font-semibold">
                  {isSameDay(currentDate, new Date())
                    ? "Hoje"
                    : isYesterday(currentDate)
                    ? `Ontem ${format(currentDate, "dd/MM/yyyy")}`
                    : isTomorrow(currentDate)
                    ? `Amanhã ${format(currentDate, "dd/MM/yyyy")}`
                    : format(currentDate, "dd/MM/yyyy")}
                </Text>

                <DirectionalButton onPress={handleNextDay} dir="right" />
              </View>

              <View className="p-3 flex-1 my-2" style={{borderBottomWidth:1, borderBottomColor: '#dedede'}}>
                <Text className="text-xl text-gray-600 font-normal">
                  Calorias restantes
                </Text>

                <View className="my-3 justify-center flex-row items-center mx-auto gap-5">
                  <NumberItem
                    num={user?.total_calories?.toFixed()}
                    label="Meta"
  
                  />

                  <Text className="text-xl font-semibold mb-5 text-gray-800">
                    {" "}
                    -{" "}
                  </Text>

                  <NumberItem num={totalCalories?.toFixed()} label="Alimentos" />

                  <Text className="text-xl font-semibold mb-5 text-gray-800">
                    {" "}
                    ={" "}
                  </Text>

                  <NumberItem num={remainCalories?.toFixed()} label="Restantes" />
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={()=>(
            <View className="p-3 mx-auto items-center">
              <Animated.View
                style={{
                  // backgroundColor: circleBg,
                  transform: [
                    {
                      perspective: 400
                    },
                    {
                      rotateY: animatedValue.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: ['0deg','-90deg','0deg']
                      })
                      
                    },
                    {
                      scale: animatedValue.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: [1,8,1]
                      })
                    },
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0,0.5,1],
                        outputRange: ['0%','50%','0%']
                      })

                    }
                  ]
                }}
              >

                <TouchableOpacity
                  disabled={totalCalories === 0}
                  onPress={finishDiary} 
                  //@ts-ignore
                  ref={animatedValue}
                  style={{borderRadius:100}} 
                  className="bg-p-blue p-3 mb-5"
                >
                  <Text className="text-white font-semibold ">
                    Completar diário
                  </Text>
                </TouchableOpacity>

              </Animated.View>
            </View>
          )}


        />

    </SafeAreaView>
  );
};

export default Diary;
