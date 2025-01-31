


import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import LoadingPage from '@/components/loading-page';
import Title from '@/components/title';
import BackButton from '@/components/back-button';
import Entypo from '@expo/vector-icons/Entypo';
import { useNutrition } from '@/hooks/useNutrition';
import GramsChanger from '@/components/grams-changer';
import FoodMacrosCircles from '@/components/food-macros-circles';
import { useMeal } from '@/hooks/useMeal';
import AntDesign from '@expo/vector-icons/AntDesign';



const ViewFood = () => {


  const {postFood,isPostingFood, patchFood} = useMeal();

  const {foodId, meal_id, database_food_id} = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true)

  const [food, setFood] = useState<Food | null>(null)

  const [foodNutrition, setFoodNutrition] = useState<FoodNutrition | null>(null)

  const {getFoodById} = useNutrition();

  const [values, setValues] = useState({
    quantity: 1,
    weight: 50
  })

  const getNutrientsByName = async () => {

    const appId = process.env.EXPO_PUBLIC_EDAMAN_APP_ID;
    const appKey = process.env.EXPO_PUBLIC_EDAMAN_API_KEY;

    const food = await getFoodById(foodId as string);

    if(food) {
      setFood(food)
    }

    try {

      const foodId = food!.foodId
  
      const response = await axios.post(
        `https://api.edamam.com/api/food-database/v2/nutrients`,
        {
          ingredients: [
            {
              measureURI: "http://www.edamam.com/ontologies/edamam.owl#Measure_gram",
              foodId: foodId,
              weight: values.weight * values.quantity,
            },
          ],
        },
        {
          params: {
            app_id: appId,
            app_key: appKey,
          },
        }
      );

      setFoodNutrition(response.data as FoodNutrition)


    } catch (error) {

      console.error("Erro ao obter informações nutricionais:", error);

      setIsLoading(true)

    } finally {

      setIsLoading(false)
    }
  };

  
  
  const createMeal = async () => {

    const body:CreateFood = {
      meal_id: Number(meal_id),
      name: food!.label,
      calories: foodNutrition!.calories,
      quantity: values.quantity,
      grams: values.weight * values.quantity,
      food_id: food!.foodId
    }

    if(database_food_id){

      const {data,error} = await patchFood(body, Number(database_food_id));
        
      if(data){
  
        router.push('/diary')
        
      } else {
        Alert.alert(error!)
      }

    } else {

      const {data,error} = await postFood(body);
  
      if(data){
  
        router.push('/diary')
        
      } else {
        Alert.alert(error!)
      }

    }
    
    

  }

  useEffect(()=> {

    getNutrientsByName();

  },[values])



  if(isLoading || isPostingFood){
    return <LoadingPage />
  }
  
  return (
    
    <View className='mt-10 h-full'>

      <View className='flex-row items-center gap-2 justify-between mb-5'>

        <View className='flex-row items-center mx-5 gap-5 '>
          <BackButton />
          <Title 
            title={database_food_id ? 'Atualizar alimento' : 'Adicionar alimento'}
            className='text-xl'
          />
        </View>

        <TouchableOpacity onPress={createMeal} className='p-3'>

          {database_food_id ? (<>
            <AntDesign name="reload1" size={24} color="#e84118" />
          </>) : (
            <Entypo name="plus" size={24} color="#e84118" />
          )}
        </TouchableOpacity>


      </View>

    <View className='p-3 flex-row justify-between items-center'>

      <Title 
        title={food?.label || 'Sem nome'}
      />

      <Text className='text-gray-600 font-semibold text-2xl'>
        {foodNutrition?.calories.toFixed()}kcal
      </Text>

    </View>

    <GramsChanger 
      label='Quantidade de porções'
      values={values}
      itemType='portions'
      setValues={setValues}
    />

    <GramsChanger 
      label='Tamanho da porção'
      values={values}
      itemType='quantity'
      setValues={setValues}
    />
    

    <FoodMacrosCircles
      food={foodNutrition as FoodNutrition}
    />

  </View>

  )
}

export default ViewFood