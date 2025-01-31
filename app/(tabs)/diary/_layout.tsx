

import React from 'react'
import { Stack } from 'expo-router'

const DiaryLayout = () => {

  return (
    
    <Stack>

        <Stack.Screen 
            name='index'
            options={{headerShown: false}}
        />

        <Stack.Screen 
            name='[mealType]'
            options={{headerShown: false}}
        />

        <Stack.Screen 
            name='success'
            options={{headerShown: false}}
        />

    </Stack>

  )
}

export default DiaryLayout