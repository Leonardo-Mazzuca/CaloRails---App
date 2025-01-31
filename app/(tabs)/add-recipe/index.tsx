import { View, SafeAreaView, FlatList, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import Title from "@/components/title";
import BackButton from "@/components/back-button";
import { FormProvider, useForm } from "react-hook-form";
import {
  CreateRecipeEnum,
  createRecipeSchema,
  CreateRecipeType,
} from "@/schemas/recipe";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/button";
import NameStep from "./name-step";
import IngredientStep from "./ingredient-step";
import { useNutrition } from "@/hooks/useNutrition";
import { Text } from "react-native";
import IngredientsTable from "@/components/ingredients-table";
import NutritionalTable from "@/components/nutritional-table";
import { useRecipes } from "@/hooks/useRecipes";
import { router } from "expo-router";

const AddRecipe = () => {
  const form = useForm<CreateRecipeType>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      step: CreateRecipeEnum.nameData,
    },
  });

  const {createRecipe,refetch} = useRecipes();

  const {getRecipeNutritionFacts,isLoading} = useNutrition();

  const [nutritionFacts, setNutritionFacts] = useState<FoodNutrition | null>(null)

  const { handleSubmit, setValue, watch, getValues } = form;

  const step = watch("step");

  const isNameStep = step === "nameData";
  const isIngredientStep = step === "ingredientData";

  const setStep = (step: CreateRecipeEnum) => {
    setValue("step", step);
  };

  const handleNextStep = async () => {
    switch (step) {
      case "nameData":
        setStep(CreateRecipeEnum.ingredientData);
        break;

      case "ingredientData":

        const {ingredientData:{facts},nameData:{name}} = getValues();

        const {data,error} = await getRecipeNutritionFacts(facts as string, name)

        if(data) {

          setNutritionFacts(data)
          
        } else {
          Alert.alert(error!)
        }

        break;
    }
  };

  
  const handleBackStep = () => {

    switch (step) {
      case "ingredientData":

        setStep(CreateRecipeEnum.nameData);  

        break;
    }

    if(nutritionFacts) {
      setStep(CreateRecipeEnum.ingredientData)
      setNutritionFacts(null)
    }

  };

  const handleConfirm = async () => {

    const {nameData:{name,picture},ingredientData:{facts}} = getValues();

    const formData = new FormData();

    formData.append('name',name)
    formData.append('description',facts),
    // formData.append('quantity',quantity)
    formData.append('calories',nutritionFacts?.calories.toString() || '0')

    if(picture) {

      const image = picture as ImageType

      formData.append('picture',{

        uri: image.uri,
        type: image.mimeType,
        name: image.fileName

      } as any)

      
    }


    const {data,error} = await createRecipe(formData)
    
    if(data) {

      await refetch();
      
      router.replace('/(tabs)')
      
    } else {
      Alert.alert(error!)
    }
    
  }

  return (
    <FormProvider {...form}>
      <SafeAreaView className="flex-1">
        <FlatList
          data={[{ key: "1" }]}
          keyExtractor={(item) => item.key}
          renderItem={() => (

            <>



              {nutritionFacts ? (

                <View className="p-12  gap-5">

                    <Title 
                      title="Detalhes da receita"
                      size="xl"
                    />

                       <IngredientsTable 
                          facts={nutritionFacts}
                        />

                        <View className="w-full h-[1px] bg-gray-300" />

                        <NutritionalTable
                             facts={nutritionFacts}
                        />

                    <View>

                      <Button
                        title="Concluir"
                        onPress={handleConfirm}
                      />

                      <Button 
                        variant="text"
                        title="Voltar"
                        textClasses="text-gray-600 underline"
                        onPress={handleBackStep}

                      />

                    </View>


                </View>
              ) : (

                <>
                
                  <View className="flex-row items-center my-3 gap-3">
                    <BackButton />

                    <Title title="Nova receita" className="text-2xl" />
                  </View>

                  <View className="p-5 h-screen">
                    {isNameStep && <NameStep />}

                    {isIngredientStep && <IngredientStep />}

                    {isLoading && (
                      <View className="flex-row items-center justify-center gap-3">
                        <Text className="text-xl font-semibold text-gray-600">
                          Analisando receita...
                        </Text>
                        <ActivityIndicator size={30} />
                      </View>
                    )}

                    <Button
                      className="my-5 w-[200px] mx-auto"
                      title="Próximo"
                      onPress={handleSubmit(handleNextStep)}
                    />

                    {!isNameStep && (
                      <Button
                        textColor="#4b5563"
                        textClasses="text-black text-md underline font-light"
                        variant="text"
                        title="Voltar"
                        onPress={handleBackStep}
                      />
                    )}
                  </View>

                </>



              )}
            </>
          )}
        />
      </SafeAreaView>
    </FormProvider>
  );
};

export default AddRecipe;
