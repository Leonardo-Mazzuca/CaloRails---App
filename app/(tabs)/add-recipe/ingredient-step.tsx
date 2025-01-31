

import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Title from '@/components/title'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateRecipeType } from '@/schemas/recipe'





const IngredientStep = () => {



  const {control} = useFormContext<CreateRecipeType>();


  return (


            <View className=' items-center gap-5'>
           
            <Title
              title='Descreva sua receita'
              className='text-[24px]'
            />
          
            <Text className='text-gray-500 text-md'>
              Adicione a lista de ingrediente a sua receita.
            </Text>

                     
            <Text className='text-gray-500 text-sm'>
              Ex: (100g de arroz, 200g de frango)
            </Text>

      <Controller 
        name='ingredientData.facts'
        control={control}
        render={({field})=> (

          <TextInput 
            style={{borderColor:'#dedede',borderWidth:1,borderRadius:5}}
            className='w-[270px] text-gray-600 h-[200px]'
            multiline
            numberOfLines={5}
            textAlignVertical='top'
            onChangeText={(e)=>{
              field.onChange(e)
            }}
            value={field.value}

          />

        )}

      />


          </View>

    
  )

}

export default IngredientStep