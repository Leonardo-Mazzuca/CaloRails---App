import { View, Text, Alert, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import LoadingPage from "@/components/loading-page";
import { useRecipes } from "@/hooks/useRecipes";
import { SafeAreaView } from "react-native-safe-area-context";
import Title from "@/components/title";
import BackButton from "@/components/back-button";
import images from "@/constants/images";
import { useNutrition } from "@/hooks/useNutrition";
import NutritionalTable from "@/components/nutritional-table";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useUser } from "@/hooks/useUser";

const Line = () => (
  <View
  className="w-full bg-gray-300 h-[1px]"
/>

)
const ShowRecipe = () => {

  const { recipe_id } = useLocalSearchParams();
  const [isLoading, setisLoading] = useState(false)
  const {getRecipeNutritionFacts,isLoading:isLoadingNutrition} = useNutrition();

  const {deleteRecipe,refetch} = useRecipes();
  const [nutritionFacts, setNutritionFacts] = useState<FoodNutrition | null>(null)

  const {getRecipe} = useRecipes()

  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const {user} = useUser();

  const onDelete = async () => {

    Alert.alert(
      'Excluir Receita', 
      'Tem certeza de que deseja excluir esta receita?', 
      [
        {
          text: 'Cancelar', 
          style: 'cancel', 
        },
        {
          text: 'Excluir', 
          onPress: async () => {
         
              if(!recipe) return 

              await deleteRecipe(recipe.id)

              await refetch();

              router.push('/(tabs)')

          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );


  }
  

  useEffect(()=> {

    const fetchRecipe = async () => {

        setisLoading(true)

        const {data,error} = await getRecipe(Number(recipe_id))

        if(data){

            const {data:nutrition,error} = await getRecipeNutritionFacts(data.description, data.name)
            
            if(nutrition){

              setNutritionFacts(nutrition)
              setRecipe(data)

            } else {
              Alert.alert(error!)
            }


        } else {
            Alert.alert(error!)
        }

        setisLoading(false)
    }

    fetchRecipe()
    
  },[])



  if(!recipe) return null

  if(isLoading || isLoadingNutrition){
    return <LoadingPage />
  }

  return (

    <SafeAreaView className=" h-full flex-1">

        <ScrollView>

            <View className="flex-row items-center gap-3 p-3">

              <BackButton />
              
              <Title
                title={recipe.name}
                className="text-2xl"
              />  

            </View>

          
            <Line
            
            />
    

              <Image
                style={{
                  borderRadius:15
                }}
                source={recipe.picture === null ? images.noImageRecipe : {uri:recipe.picture}}
                alt={recipe.name}
                className="w-[200px] mx-auto h-[200px] rounded-lg"
                resizeMode="cover"
              />

              <Line
            
              />

        <View className="p-3 flex-row justify-between">

          <View>

            <Text className="text-2xl text-gray-600 my-2">
              Ingredientes
            </Text>

            <Text className="text-lg fotn-normal text-gray-500">
              {recipe.description}
            </Text>

          </View>
          
          <View className="items-center">
            <Text className="mt-3 text-2xl text-gray-500 font-semibold">
              {nutritionFacts?.calories}kcal
            </Text>

            
              {user.id === recipe.user_id && (

                <View className="mt-auto">
                  <TouchableOpacity 
                  onPress={onDelete}
                  style={{
                    borderRadius:10
                  }} 
                  className="bg-red-500 p-2">
                        <EvilIcons name="trash" size={28} color="white" />
                  </TouchableOpacity>
                </View>

              )}

          </View>

        </View>

        
        <Line
            
        />

        <View className="p-3">

          <NutritionalTable
            facts={nutritionFacts!}
          />

        </View>
        


        </ScrollView>

    </SafeAreaView>

  );
};

export default ShowRecipe;
