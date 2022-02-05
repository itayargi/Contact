import { StyleSheet, I18nManager, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import screensName from './src/utils/screensName';
import ContactDetails from './src/screens/ContactDetails';
import Colors from './src/utils/Colors';
import Onboarding from './src/screens/Onboarding';
import { AppProvider } from './src/context/AppProvider';
import Splash from './src/screens/Splash';
import strings from './src/utils/strings';

I18nManager.allowRTL(false);

const Stack = createNativeStackNavigator();

const App = () => {

  /* params for 4 screens:
    1. splash screen
    2. onboarding screen - only the first user's entrance
    3. homeScreen - renders 10 contact cards each time
    4. ContactDetails - shows the details for the contact
  */
  const params = {

    navigator: {
      headerMode: "screen",
      initialRouteName: screensName.Splash,
    },
    splash: {
      options: { headerShown: false },
      name: screensName.Splash,
      component: Splash,
    },
    Onboarding: {
      options: { headerShown: false },
      name: screensName.Onboarding,
      component: Onboarding,
    },
    homeScreen: {
      options: { headerShown: false },
      name: screensName.HomeScreen,
      component: HomeScreen,
    },
    contactDetails: {
      name: screensName.ContactDetails,
      component: ContactDetails,
      options: {
        headerBackTitle: "",
        headerTitleAlign: "center", title: strings.contactDetails_headerTitle, headerStyle: {
          backgroundColor: Colors.headerBackground,
        },
      },

    },

  }
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator   {...params.navigator}>
            <Stack.Screen  {...params.splash} />
            <Stack.Screen  {...params.homeScreen} />
            <Stack.Screen {...params.contactDetails} />
            <Stack.Screen {...params.Onboarding} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



