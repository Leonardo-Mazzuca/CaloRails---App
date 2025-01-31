import { View, Text } from "react-native";
import React from "react";

const IngredientsTable = ({ facts }: { facts: FoodNutrition }) => {
  return (
    <View className="w-full border border-gray-300 rounded-md overflow-hidden">
      <View className="flex-row bg-gray-100 py-2 border-b border-gray-300">
        <Text className="flex-1 font-bold text-left px-2">Nome</Text>
        <Text className="flex-1 font-bold text-left px-2">Qntd</Text>
        <Text className="flex-1 font-bold text-left px-2">Calorias</Text>
      </View>

      {facts.ingredients.map((ingr, index) => {
        const parsedIngredient =
          ingr.parsed && ingr.parsed[0] ? ingr.parsed[0] : null;

        //? DEBUG ONLY
        // console.log(JSON.stringify(ingr.parsed));

        const calories =
          parsedIngredient.nutrients.ENERC_KCAL.quantity.toFixed();

        return (
          <View className="flex-row border-b border-gray-200 py-2" key={index}>
            <Text className="flex-1 text-left px-2">
              {parsedIngredient?.food || ingr.text}
            </Text>
            <Text className="flex-1 text-left px-2">
              {parsedIngredient?.quantity}
              {parsedIngredient?.measure}
            </Text>
            <Text className="flex-1 text-left px-2">{calories}kcal</Text>
          </View>
        );
      })}
    </View>
  );
};

export default IngredientsTable;
