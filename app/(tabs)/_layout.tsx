import { Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';


import { IconSymbol } from '@/components/ui/IconSymbol';

import AntDesign from '@expo/vector-icons/AntDesign';



const TabButton = ({children,...rest}:TouchableOpacityProps) => {

  return (

    <TouchableOpacity
    style={{
      top: -25,
      justifyContent:'center',
      alignItems:'center',

    }}
    {...rest}
  >
    <View 
    style={{
      borderRadius: 100,
      width: 50,
      height: 50,
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}
     className='bg-p-blue'
     >

      {children}

    </View>

  </TouchableOpacity>

  )
}



export default function TabLayout() {


  return (

    <Tabs
      
      screenOptions={{
        tabBarActiveTintColor: '#333333',
        headerShown: false,
        tabBarStyle: {
          bottom: 20,
          marginHorizontal: 10,
          marginBottom: 5,
          height: 50,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          paddingTop:10
        },
        
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} />,
          
        }}
      />


      <Tabs.Screen
        name="add-recipe"
        options={{
          title: '',

          tabBarButton: (props:any) => (
            <TabButton onPress={props.onPress}>
               <AntDesign name="plus" size={24} color={"white"} />
            </TabButton>
          )
          
        }}
        
      />

      <Tabs.Screen
        name="diary"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <AntDesign name="book" size={22} color={color} />,
        }}
      />




    </Tabs>

  );
}
