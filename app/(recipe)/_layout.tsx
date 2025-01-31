

import React from 'react'
import { Stack } from 'expo-router'

const RecipeLayout = () => {

  return (

    <Stack>
        <Stack.Screen
            name='[recipe_id]'
            options={{headerShown: false}}
        />
    </Stack>
    
  )
}

export default RecipeLayout