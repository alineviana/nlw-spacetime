import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import { 
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes)

export default function Layout() {
    const [isUserAuthenticaded, setIsUserAuthenticaded] = useState<
    null | boolean
    >(null)

    const [hasLoadedFonts] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        BaiJamjuree_700Bold
      })

    useEffect(() => {
      SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticaded(!!token)
      })
    }, [])

    if (!hasLoadedFonts) {
      return <SplashScreen />
    }
      
    return (
    <ImageBackground
      source={blurBg}
      className="relative bg-gray-900 flex-1"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack screenOptions={{ 
        headerShown: false, 
        contentStyle: { backgroundColor: 'transparent'}, 
        animation: 'fade', 
        }}>
        <Stack.Screen name="index" redirect={isUserAuthenticaded} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    
    </ImageBackground>
  )
}
