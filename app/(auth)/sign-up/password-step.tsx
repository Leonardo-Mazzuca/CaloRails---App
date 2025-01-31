

import { View, Text } from 'react-native'
import React from 'react'
import Title from '@/components/title'
import FormField from '@/components/form-field'
import { Link } from 'expo-router'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRegister } from '@/schemas/auth'

const PasswordStep = () => {

  const {
    control,
    formState:{errors}
  } = useFormContext<UserRegister>()

  return (
    

      <>
      
          <View className='my-5' style={{gap:5}}>

            <Title
              title='Crie uma senha'
              className='mt-5'
              wheight='normal'
            />  

            <Text className='text-gray-500 text-md font-light'>
              Crie uma senha que seja segura e fácil de lembrar🔒
            </Text>

          </View>

          <View style={{gap:5}}>


            <Controller
              control={control}
              name='passwordData.password'
              render={({field})=> (
                <FormField
                  label='Senha'
    
                  error={errors.passwordData?.password?.message}
                  onChangeText={(e)=>field.onChange(e)}
                  type='password'
        
         
                />

              )}
            />

            <Controller
              control={control}
              name='passwordData.confirmPassword'
              render={({field})=> (
                <FormField
                  label='Confirmar senha'
      
                  type='password'
                  error={errors.passwordData?.confirmPassword?.message}
                  onChangeText={(e)=>field.onChange(e)}
  
         
                />

              )}
            />


          </View>
      
      
      </>


  )

}

export default PasswordStep