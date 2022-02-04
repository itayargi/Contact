import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import imageIndex from '../assets/imageIndex';
import sizes from '../utils/sizes';
import Colors from '../utils/Colors';
import strings from '../utils/strings';
import screensName from '../utils/screensName';
import AppContext from '../context/AppContext';

const Onboarding = ({navigation}) => {
    const {updateUserDetails} = useContext(AppContext)

    const params = {
        image: {
            style: styles.image,
            source: imageIndex.onBoarding(),
            resizeMode: 'contain'
        }
    }
    const onBtnPress = () => {
        updateUserDetails({finishOnboarding: true})
        navigation.reset({
          index: 0,
          routes: [{ name:screensName.HomeScreen }],
        });
      };
    
    return (
        <View style={styles.container}>
            <Image  {...params.image} />
            <View style={styles.body}>
                <Text style={styles.title}>{strings.onboardingTitle}</Text>
                <Text style={styles.subTitle}>{strings.onboardingSubTitle}</Text>
                <TouchableOpacity onPress={onBtnPress}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>{strings.onboarding_btn}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteBackground
    },
    image: {
        width: sizes.PageWidth,
        height: sizes.PageHieght * 0.5
    },
    body: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    btn: {
        width: sizes.PageWidth * 0.9,
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: Colors.cardBackground,
        height: 50,
        justifyContent: "center",
        borderRadius: 10
    },
    btnText: {
        fontSize: 18,
        color: Colors.text
    },
    title: {
        fontSize: 22,

    },
    subTitle: {
        textAlign: "center",
        paddingHorizontal: 20,
        fontSize: 18,

    }
});
