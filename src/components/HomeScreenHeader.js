import { StyleSheet, Text, Animated } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import strings from '../utils/strings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IS_IOS } from '../utils/constant';

// header animation settings
const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HEADER_HEIGHT = 100

const HomeScreenHeader = (props) => {
    const { scrollY } = props
    let insets = useSafeAreaInsets()

    const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp',
    });

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT + insets.top],
        outputRange: [HEADER_HEIGHT + insets.top - 40, insets.top],
        extrapolate: 'clamp'
    });
    return (
        <Animated.View style={[styles.container, { transform: [{ scale: titleScale }], height: headerHeight }]}>
            <Text style={styles.text}>{strings.homeScreen_headerText}</Text>
        </Animated.View>
    );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
    container: {
        height: 80,
        backgroundColor: Colors.headerBackground
        ,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    text: {
        color: Colors.text,
        fontSize: 22
    }
});
