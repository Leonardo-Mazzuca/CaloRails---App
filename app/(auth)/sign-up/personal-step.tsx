

import { View, Text } from 'react-native'
import React from 'react'
import Title from '@/components/title'
import FormField from '@/components/form-field'
import { Link } from 'expo-router'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRegister } from '@/schemas/auth'

const PersonalStep = () => {

  const {
    control,
    formState:{errors}
  } = useFormContext<UserRegister>()

  return (
    

      <>
      
      
          <View className='my-5' style={{gap:5}}>

            <Title
              title='Criar conta'
              className='mt-5'
              wheight='normal'
            />  

            <Text className='text-gray-500 text-md font-light'>
              Preencha com seus dados pessoais
            </Text>

          </View>

          <View style={{gap:5}}>

            <Controller
              control={control}
              name='personalData.fullname'
              render={({field})=> (
                <FormField
                  label='Nome completo'
                  placeholder='Digite seu nome completo'
                  error={errors.personalData?.fullname?.message}
                  onChangeText={(e)=>field.onChange(e)}
          
         
                />

              )}
            />

            <Controller
              control={control}
              name='personalData.email'
              render={({field})=> (
                <FormField
                  label='Email'
                  placeholder='Digite seu email'
                  error={errors.personalData?.email?.message}
                  onChangeText={(e)=>field.onChange(e)}
          
         
                />

              )}
            />

            <Controller
              control={control}
              name='personalData.phone'
              render={({field})=> (
                <FormField
                  label='Telefone'
                  placeholder='(11) 1111-1111'
                  error={errors.personalData?.phone?.message}
                  onChangeText={(e)=>field.onChange(e)}
            
         
                />

              )}
            />

   

  

          </View>
      
      
      </>


  )

}

export default PersonalStep