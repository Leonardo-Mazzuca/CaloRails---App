

import { View, Text } from 'react-native'
import React from 'react'

const NutritionalTable = ({facts}:{facts:FoodNutrition}) => {
    if (!facts || !facts.totalNutrients) {
        return <Text className="p-4 text-center text-gray-500">Informações nutricionais não disponíveis.</Text>;
    }

    const nutrientsToShow = [
        "ENERC_KCAL", "FAT", "PROCNT", "CHOCDF", "FASAT", "CHOCDF.net", "CHOLE", "NA", "K", "FE", "CA"
    ];

    return (
        <View className="w-full">
            <Text className="text-md text-gray-600 mb-2 font-semibold">Informação Nutricional</Text>
            <View className="border border-gray-300 rounded-md overflow-hidden">
                <View className="flex-row bg-gray-100 py-2 border-b border-gray-300">
                    <Text className="flex-1 font-bold text-left px-2">Nutriente</Text>
                    <Text className="flex-1 font-bold text-left px-2">Quantidade</Text>
                    <Text className="flex-1 font-bold text-left px-2">Unidade</Text>
                </View>

                {nutrientsToShow.map((nutrientKey) => {
                    //@ts-ignore
                    const nutrient = facts.totalNutrients[nutrientKey];
                    if (!nutrient) return null;

                    return (
                        <View className="flex-row border-b border-gray-200 py-1" key={nutrientKey}>
                            <Text className="flex-1 text-left px-2">{nutrient.label}</Text>
                            <Text className="flex-1 text-left px-2">{nutrient.quantity.toFixed(2)}</Text> 
                            <Text className="flex-1 text-left px-2">{nutrient.unit}</Text>
                        </View>
                    );
                })}
            </View>


            <View className="mt-4">
                <Text className="text-base font-bold">Informações Adicionais</Text>

                <View className="flex-row py-1">
                    <Text className="flex-1 text-left font-normal">Calorias Totais:</Text>
                    <Text className="flex-1 text-gray-800 font-bold text-left">{facts.calories}kcal</Text>
                </View>

                <View className="flex-row py-1">
                    <Text className="flex-1 text-left font-normal">Peso Total:</Text>
                    <Text className="flex-1 text-left text-gray-800 font-bold">{facts.totalWeight.toFixed(2)} g</Text>
                </View>
            </View>
        </View>

    );
}

export default NutritionalTable