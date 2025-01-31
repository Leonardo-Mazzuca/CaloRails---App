import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Title from "./title";
import { useUser } from "@/hooks/useUser";
import { BarChart } from "react-native-gifted-charts";
import { useRecipes } from "@/hooks/useRecipes";
import { useMeal } from "@/hooks/useMeal";

const DiaryChart = () => {

  const { user } = useUser();

  const {totalCalories,getTotalCalories} = useMeal();
  
  const barData = [
    { value: 250, label: "7am" },
    { value: 500, label: "9am", },
    { value: 745, label: "12pm", },
    { value: 320, label: "15pm" },
    { value: 600, label: "19pm", },
    { value: 256, label: "21pm" },
  ];

  const remainCalories = user?.total_calories - totalCalories;

  useEffect(() => {
    getTotalCalories();
  },[])

  return (
    <View className="my-3 mb-10">

      <Title title="Relatório diário" size="xl" />

      <View style={{ backgroundColor: "#D6F7F7", borderRadius:20 }} className="my-3 p-3">
        
        <View className="justify-between flex-row items-center">
            
            <View>

                <Text className="font-light text-gray-500 text-xl">
                    Calorias diárias
                </Text>
                <Text className="text-p-blue text-end font-semibold text-xl">
                    {user?.total_calories?.toFixed()}
                </Text>

            </View>

            <View className="items-end">

                <Text className="text-gray-500 font-light text-xl">
                    Restantes
                </Text>

                <Text className="text-p-blue text-end font-semibold text-xl">
                    {remainCalories?.toFixed()}
                </Text>

            </View>

        </View>

        <BarChart
            barWidth={20}
            height={150}
            noOfSections={3}
            barBorderRadius={4}
            frontColor="#FFDDDD"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            hideRules
            hideAxesAndRules
            roundedTop
            roundedBottom
            hideYAxisText
            referenceLine1Position={420}
            referenceLine1Config={{
                color: 'gray',
                dashWidth: 2,
                dashGap: 3,
            }}
            spacing={30}
            gradientColor={"#31D6D6"}
            showGradient
            xAxisLabelTextStyle={{
                color: '#6b7280',
                fontWheight: 'bold'
            }}

          
        />

      </View>
    </View>
  );
};

export default DiaryChart;
