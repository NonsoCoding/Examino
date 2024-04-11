import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Examino } from './FrameWork/Screens/intro';
import * as Font from 'expo-font';
import { Raleway_200ExtraLight, Raleway_300Light, Raleway_400Regular, Raleway_100Thin,  Raleway_900Black, Raleway_600SemiBold, Raleway_500Medium, Raleway_800ExtraBold, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { useState, useEffect, useCallback } from 'react'
import { StackNavigation } from './FrameWork/Navigators/StackNavigator';
import { AppProvider } from './FrameWork/components/Globalvariables';
import { Preloader } from './FrameWork/components/preloader';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
          try {
            await Font.loadAsync({ Pacifico_400Regular });
            await Font.loadAsync({ Raleway_100Thin });
            await Font.loadAsync({ Raleway_200ExtraLight });
            await Font.loadAsync({ Raleway_300Light });
            await Font.loadAsync({ Raleway_400Regular });
            await Font.loadAsync({ Raleway_500Medium });
            await Font.loadAsync({ Raleway_600SemiBold });
            await Font.loadAsync({ Raleway_700Bold});
            await Font.loadAsync({ Raleway_800ExtraBold });
            await Font.loadAsync({ Raleway_900Black });
            await new Promise(resolve => setTimeout(resolve, 2000));
          } catch (e) {
            console.warn(e);
          } finally {
            setAppIsReady(true);
          }
        }
    
        prepare();
      }, []);

      useCallback(async () => {
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }
   
  
  return (
    <View style={{flex: 1}}>
      <AppProvider>
        <Preloader/>
      <StackNavigation />
      </AppProvider>
    </View>
  );
}

