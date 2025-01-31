


import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from './title';
import { Picker } from '@react-native-picker/picker';

type Props = {
    label: string;
    values: {quantity: number, weight: number}
    itemType: 'quantity' | 'portions',
    setValues: (values: {quantity: number, weight: number})=>void
  }
  

const GramsChanger = ({itemType,label,setValues,values}:Props) => {

    const [showModal, setshowModal] = useState(false)

    const [initialValues, setInitialValues] = useState<{quantity: number, weight: number}>({
      quantity: 0,
      weight: 0
    })
  
    const onValuesSave = () => {
  
      setValues(initialValues)
  
      setshowModal(false)
  
    }
  
    const onCancel = () => {
  
      setInitialValues(values)
      setshowModal(false)
  
    }
  
    useEffect(() => {
      setInitialValues(values);
    }, [values]);

    
  
    return (
      
      <View>
      
        <TouchableOpacity 
        onPress={()=>setshowModal(true)}
        style={{
          paddingVertical:20,
          borderBottomColor: '#dedede',
          borderBottomWidth:1,
          paddingHorizontal: 10
  
          }} className='justify-between flex-row items-center my-2'
          >
          <Text className='text-gray-600 font-medium'>
            {label}
          </Text>
  
  
          <Text className='text-gray-700 font-bold text-xl'>
            {itemType === 'quantity' ? `${values.weight}g` : values.quantity}
          </Text>
        </TouchableOpacity>
  
        <Modal
          visible={showModal}
          animationType='fade'
          transparent
          
        >
          <TouchableWithoutFeedback onPress={onCancel}>
  
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
  
              <View
                style={{
                  width:'90%',
                  backgroundColor:'#fff',
                  padding: 20,
                  borderRadius:15
                }}
              >
  
  
                 <Title 
                  title='Quanto?' 
                  size='xl'
                 />
  
                  <View className='flex-row p-3 w-full items-center gap-2'>
  
                    <TextInput 
                        keyboardType='numeric'
                        value={String(initialValues.quantity)}
                        onChangeText={(e)=>{
                          setInitialValues({
                            ...initialValues,
                            quantity: Number(e)
                          })
                        }}
                        className='border border-t-0 border-r-0 border-l-0 border-gray-400 w-[150px]'
                    />
  
                    <Text className='text-gray-500 font-semibold'>
                    porção(ões) de
                    </Text>
  
                  </View>
  
             
                    <Picker
                      mode='dropdown'
                      onValueChange={(e)=> {
                        setInitialValues({
                          ...initialValues,
                          weight: e
                        })
                      }}
                      selectedValue={initialValues.weight}
                    >
                      <Picker.Item
                        label='1g'
                        value={1}
                      />
  
                      <Picker.Item
                        label='20g'
                        value={20}
                      />
  
                      <Picker.Item
                        label='50g'
                        value={50}
                      />
  
                      <Picker.Item
                        label='100g'
                        value={100}
                      />
                    </Picker>
  
                    <View className='flex-row justify-end items-center gap-5'>
  
                      <TouchableOpacity onPress={onCancel}>
                        <Text className='text-p-blue'>
                          Cancelar
                        </Text>
                      </TouchableOpacity>
  
                      <TouchableOpacity onPress={onValuesSave}>
                        <Text className='text-p-blue'>
                          Salvar
                        </Text>
                      </TouchableOpacity>
  
                    </View>
                  
  
              </View>
  
            </View>
  
          </TouchableWithoutFeedback>
        </Modal>
      
      
      </View>
    )
}

export default GramsChanger