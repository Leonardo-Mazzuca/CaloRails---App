

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Title from '@/components/title'
import FormField from '@/components/form-field'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRegister } from '@/schemas/auth'
import { Picker } from '@react-native-picker/picker'

const BodyStep = () => {

  const {
    control,
    formState:{errors}
  } = useFormContext<UserRegister>()

  const [gender, setGender] = useState('')

  return (
    

      <>
      
          <View className='my-5' style={{gap:5}}>

            <Title
              title='Agora nos conte um pouco mais...'
              className='mt-5'
              wheight='normal'
            />  

            <Text className='text-gray-500 text-md font-light'>
              Precisamos saber sua idade, peso e altura para criarmos a rotina ideal 🥚🍗
            </Text>

          </View>

          <View style={{gap:5}}>

          <Controller
              control={control}
              name='bodyData.age'
              render={({field})=> (
                <FormField
                  label='Idade'
                  placeholder='23'
                  error={errors.bodyData?.age?.message}
                  onChangeText={(e)=>field.onChange(e)}
                  keyboardType='numeric'
        
         
                />

              )}
            />

          <Controller
              control={control}
              name='bodyData.wheight'
              render={({field})=> (
                <FormField
                  label='Peso (kg)'
                  placeholder='70'
                  error={errors.bodyData?.wheight?.message}
                  onChangeText={(e)=>field.onChange(e)}
                  keyboardType='numeric'
               
         
                />

              )}
            />

          <Controller
              control={control}
              name='bodyData.height'
              render={({field})=> (
                <FormField
                  label='Altura (cm)'
                  placeholder='175'
                  error={errors.bodyData?.height?.message}
                  onChangeText={(e)=>field.onChange(e)}
                  keyboardType='numeric'
        
         
                />

              )}
            />

           <View className='my-3'>

            <Text className='text-gray-600 font-semibold my-2 text-sm'>
              Sexo
            </Text>

              <Controller 
                control={control}
                name='bodyData.gender'
                render={({field})=> (
                  <Picker 
                    placeholder='Selecione'
                    selectedValue={gender}
                    onValueChange={(value)=> {
                      setGender(value)
                      field.onChange(value)
                    }}
                  >

                      <Picker.Item value="" label="Selecione" />

                      <Picker.Item 
                    
                        value={'male'}
                        label={'Homem'}
                      />
                      <Picker.Item 
                    
                        value={'female'}
                        label={'Mulher'}
                      />
                  
                  </Picker>
                  
                )}
              />

            </View>



          </View>
      
      
      </>


  )

}

export default BodyStep