import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

import '../style/global.css'
import 'react-native-reanimated';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/service';

import { useAuth } from '@/hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {



  const {currentUser} = useAuth();

  useEffect(()=> {

    const checkUser = async () => {

      const user = await currentUser()

      //@ts-ignore
      if(user.status === 401 || user.error){
        return;
      } else {
        router.push('/(tabs)')
      }
    
      

    }

    checkUser()
    
  },[currentUser])

  
  return (


      <Stack>

        <Stack.Screen name='index' options={{ headerShown: false }} />

        <Stack.Screen name='(auth)' options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen name="(recipe)" options={{ headerShown: false }} />
        
        <Stack.Screen name="(diary)" options={{ headerShown: false }} />

      </Stack>



  )
}

export default function RootLayout() {

  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"), 
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (


    <GestureHandlerRootView className="flex-1">

        <QueryClientProvider client={queryClient}>

            {/* <ThemeProvider > */}

                <InitialLayout />

                <StatusBar style="auto" />

            {/* </ThemeProvider> */}

        </QueryClientProvider>
        
    </GestureHandlerRootView>

  );

}
