

import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingPage = () => {

  return (

    <View className='min-h-screen items-center gap-3 justify-center'>

        <ActivityIndicator 
            size={50}
            color={"#31D6D6"}
        />

        <Text className='text-gray-600 font-bold text-xl'>
            Carregando...
        </Text>

    </View>

  )
}

export default LoadingPage