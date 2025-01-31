import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '@/constants/images';
import Title from '@/components/title';
import Button from '@/components/button';
import { router } from 'expo-router';
import { useUser } from '@/hooks/useUser';
import LoadingPage from '@/components/loading-page';
import { useMeal } from '@/hooks/useMeal';

const DiarySuccess = () => {
  
  const { user, isLoading } = useUser();
  const { totalCalories, getTotalCalories } = useMeal();
  const [predictedWeight, setPredictedWeight] = useState<number | null>(null);

  useEffect(() => {
    getTotalCalories();
  }, []);

  useEffect(() => {

    if (user && totalCalories) {

      const calorieDifference = totalCalories - user.total_calories; 

      const caloriesInTwoWeeks = calorieDifference * 14;

      const weightChange = caloriesInTwoWeeks / 7700; 

      const newWeight = user.wheight + weightChange; 

      setPredictedWeight(newWeight);
    }
  }, [user, totalCalories]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <View className="h-screen flex items-center justify-between py-10">
      <View className="flex items-center justify-center" style={{ paddingHorizontal: 20 }}>
        <Image
          source={images.healthyFood}
          className="w-[200px] my-3 h-[200px]"
          resizeMode="contain"
        />

        <Title title="Muito bem!" wheight="normal" size="md" className="text-p-blue" />

        <Text className="text-center text-gray-400 font-medium text-md my-3">
          Se você continuar comendo assim em 2 semanas, seu peso será de
        </Text>

        {predictedWeight !== null && (
          <Text className="text-center text-xl font-semibold text-gray-800">
            {predictedWeight.toFixed(2)} kg
          </Text>
        )}

        <Button
          className="w-[60%] mt-10"
          title="Voltar"
          onPress={() => router.push('/diary')}
        />
      </View>
    </View>
  );
};

export default DiarySuccess;
