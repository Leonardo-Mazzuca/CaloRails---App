

import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const DiaryLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
            name='success'
            options={{headerShown: false}}
        />
    </Stack>
  )
}

export default DiaryLayout