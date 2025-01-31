

import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateRecipeType } from '@/schemas/recipe'
import FormField from '@/components/form-field'
import ImageUploader from '@/components/image-uploader'
import * as ImagePicker from "expo-image-picker";
import AntDesign from '@expo/vector-icons/AntDesign'

const NameStep = () => {

  const {control,formState:{errors},setValue} = useFormContext<CreateRecipeType>()
  const [image, setImage] = useState<ExpoImageType | null>(null)

  const pickImage = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permissão para acessar a biblioteca de imagens é necessária!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0] as ExpoImageType);

      
      setValue("nameData.picture",result.assets[0] as ExpoImageType)
    }

  };

  return (

    <>

      <Controller
        control={control}
        name='nameData.name'
        render={({field})=> (
          <FormField 
            label='Nome da receita'
            onChangeText={(e)=>field.onChange(e)}
            error={errors.nameData?.name?.message}
            value={field.value}
            
          />
        )}
      />

      <Controller
        control={control}
        name='nameData.quantity'
        render={({field})=> (
          <FormField 
            keyboardType='numeric'
            label='Porções'
            onChangeText={(e)=>field.onChange(e)}
            error={errors.nameData?.quantity?.message}
            value={field.value}
            
          />
        )}
      />

      <Controller
        control={control}
        name='nameData.picture'
        render={()=> (
          <View className='gap-5 mt-2'>
            <Text className='text-gray-600 font-semibold'>
              Imagem (opcional)
            </Text>
            <View className="relative">
      <TouchableOpacity
        style={{
          borderColor: "#6b7280",
          borderWidth: 1,
          borderStyle: "dashed",
          borderRadius: 5,
          height: 120,
        }}
        onPress={pickImage}
        className="items-center justify-center p-4"
      >
        <View
          style={{
            borderColor: "#6b7280",
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 5,
            height: 50,
          }}
          className="items-center justify-center p-3"
        >
          <AntDesign name="plus" size={24} color="#6b7280" />
        </View>
      </TouchableOpacity>

      {image && 
      <TouchableOpacity 
      onPress={pickImage} 
      style={{left:140, top: 10,borderRadius:20,overflow:'hidden'}} className="absolute">

          <Image 
            resizeMode="cover" 
            className="w-[100px] h-[100px]" 
            source={{ uri: image.uri }}
     
            
        />    

      </TouchableOpacity>

        }

    </View>
          </View>
        )}
      />

    </>

  )
}

export default NameStep