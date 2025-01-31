

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import Title from '@/components/title';
import FormField from '@/components/form-field';
import { activityStatus } from '@/constants';
import { Controller, useFormContext } from 'react-hook-form';
import { UserRegister } from '@/schemas/auth';

const GoalStep = () => {

  const [frequency, setFrequency] = useState('')

  
  const {
    control,
    formState:{errors}
  } = useFormContext<UserRegister>()

  return (

    <>
    
      <View className='my-5' style={{gap:5}}>

      <Title
        title='Quase lá...'
        className='mt-5'
        wheight='normal'
      />  

      <Text className='text-gray-500 text-md font-light'>
        Nos diga sua meta de peso, e com que frequência você se movimenta 🏃
      </Text>

    </View>

    <View style={{gap:5}}>

      

          <Controller
              control={control}
              name='goalData.goal'
              render={({field})=> (
                <FormField
                  label='Meta de peso (kg)'
                  keyboardType='numeric'
                  placeholder='80'
                  error={errors.goalData?.goal?.message}
                  onChangeText={(e)=>field.onChange(e)}
       
         
                />

              )}
            />


      <View className='my-3'>

        <Text className='text-gray-600 font-semibold my-2 text-sm'>
        Nível de atividade
        </Text>
        <Controller 
          control={control}
          name='goalData.frequency'
          render={({field})=> (
            <Picker 
              selectedValue={frequency}
              onValueChange={(value)=> {
                setFrequency(value)
                field.onChange(value)
              }}
            >
              {activityStatus.map((item,index)=> (
                <Picker.Item 
                  key={index}
                  value={item.value}
                  label={item.label}
                />
              ))}
            </Picker>
            
          )}
        />

      </View>


    </View>
    
    </>


  )
}

export default GoalStep