import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getMealName, mealArray } from "@/constants";
import BackButton from "@/components/back-button";
import { Picker } from "@react-native-picker/picker";
import SearchInput from "@/components/search-input";
import axios from "axios";
import Title from "@/components/title";
import FoodCard from "@/components/food-card";
import { useMeal } from "@/hooks/useMeal";
import LoadingPage from "@/components/loading-page";
import { translateText } from "@/functions";

const AddFood = () => {

  const { mealType, meal_id } = useLocalSearchParams();


  const [initialMealId, setInitialMealId] = useState<number | null>(null)

  const {getMeals,isFetchingMeals} = useMeal();

  const [meals, setMeals] = useState<Meal[]>([])

  useEffect(()=> {

    const fetchMeals = async () => {

      const {data,error} = await getMeals();

      if(data){
        setMeals(data)
      } else {
        Alert.alert(error!)
      }

    }

    fetchMeals()

  },[])
  

  const [meal, setMeal] = useState<{ type: number; id: number }>({
    type: 0,
    id: 0,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [foods, setfoods] = useState<Food[]>([]);

  const handleSearch = async () => {

    setIsLoading(true);

    // const translatedText = await translateText(search, 'inglês')

    try {
      const edamanApiKey = process.env.EXPO_PUBLIC_EDAMAN_API_KEY;
      const appId = process.env.EXPO_PUBLIC_EDAMAN_APP_ID;

      const req = await axios.get(
        `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${edamanApiKey}&ingr=${search}`
      );

      const data = req.data;

      if (data.hints && data.hints.length > 0) {

        setfoods(data.hints.map((hint: any) => hint.food));

      } else {

       Alert.alert('Nenhum alimento encontrado!')

      }
    } catch (error) {

      console.log("Erro ao pegar comidas!", JSON.stringify(error));

      Alert.alert('Erro ao buscar alimentos!')

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    if (mealType && meal_id) {

      setMeal({
        id: Number(meal_id),
        type: Number(mealType),
      });

    }


  }, [mealType, meal_id]);

  useEffect(()=> {

    if(meal_id){
      setInitialMealId(Number(meal_id))
    }

  },[meal_id])


  if(isFetchingMeals) {
    return <LoadingPage />
  }

  return (
    <SafeAreaView className="flex h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="flex-row p-3 items-center">
            <BackButton />
            <View style={{ marginLeft: 80 }} className="text-center w-full">
            <Picker
              style={{ width: "50%" }}
              mode="dropdown"
              selectedValue={JSON.stringify(meal)} 
              onValueChange={(itemValue) => {
                const selectedMeal = JSON.parse(itemValue);
                setMeal(selectedMeal);
                setInitialMealId(selectedMeal.id);
                router.push(`/diary/${selectedMeal.type}?meal_id=${selectedMeal.id}`);
              }}
            >
              {meals?.map((item) => (
                <Picker.Item
                  key={item.id}
                  label={getMealName(item.meal_type as number)}
                  value={JSON.stringify({ id: item.id, type: item.meal_type })}
                  style={{
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Picker>
            </View>
          </View>
        )}
        data={[{ key: "1" }]}
        keyExtractor={(item) => item.key}
        renderItem={() => (
          <View>
            <View className="p-3">

              <SearchInput
                value={search}
                onChangeText={setSearch}
                onBlur={handleSearch}
                
              />

            </View>

            {isLoading ? (
              <View className="flex mx-auto items-center gap-3">
                <Text className="text-gray-600  mt-10 font-semibold">
                  Procurando...
                </Text>
                <ActivityIndicator />
              </View>
            ) : (
              foods.length > 0 && (
                <>
                  <FlatList
                    className="mb-12"
                    data={foods}
                    keyExtractor={(_, index) => String(Math.random() * index)}
                    ListHeaderComponent={() => (
                      <Title
                        title="Resultados da busca"
                        size="xl"
                        className="my-5 mx-3"
                      />
                    )}
                    renderItem={({ item }) => (
                      <FoodCard
                        food={item}
                        key={item.foodId}
                        //@ts-ignore
                        onPress={()=>router.push(`/diary/${mealType}/${item.foodId}?meal_id=${initialMealId}&meal_type=${mealType}`)}
                      />
                    )}

                  />
                </>
              )
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AddFood;
