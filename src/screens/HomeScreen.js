import { StyleSheet, View, RefreshControl, TouchableOpacity, Text, Animated, Alert, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { getContacts } from '../api/api';
import ContactBox from '../components/ContactBox';
import Loader from '../components/Loader';
import screensName from '../utils/screensName';
import { wait } from '../utils/functionUtils';
import sizes from '../utils/sizes';
import Colors from '../utils/Colors';
import strings from '../utils/strings';
import HomeScreenHeader from '../components/HomeScreenHeader';
import imageIndex from '../assets/imageIndex';

const HomeScreen = ({ navigation }) => {
    const [contactList, setContactList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const offset = useRef(new Animated.Value(0)).current;

    const onCardPress = (contact) => {
        navigation.navigate(screensName.ContactDetails, {
            contact
        });
    }
    const onError = (error) => {
        console.log('error on get request', error);
        setIsLoading(false)
        Alert.alert(strings.homeScreen_errorMessage)
    }
    const getTenContactsFromServer = async () => {
        let contactList = []
        let renderFlag = 0
        while (contactList.length < 10) {
            if (renderFlag > 20) {
                onError("too many renders")
                break
            }
            try {
                let res = await getContacts()
                if (res.status == 200) {
                    res = await res?.json()
                    res?.results?.[0] && contactList.push(res.results[0])
                }
                else {
                    renderFlag++
                }
            }
            catch (e) {
                onError(e)
                break
            }

        }
        contactList && setContactList([...contactList])
        setIsLoading(false)
    }

    const onBtnPress = () => {
        setIsLoading(true)
        getTenContactsFromServer()
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(700).then(() => {
            setIsLoading(true)
            getTenContactsFromServer()
            setRefreshing(false)
        });
    }, []);
    useEffect(() => {
        getTenContactsFromServer()
    }, [])

    const handleScroll =
        Animated.event(
            [{
                nativeEvent: {
                    contentOffset: {
                        y: offset
                    }
                }
            }
            ],
            {
                useNativeDriver: false,
            }
        )
    const params = {
        flatList: {
            data: contactList,
            contentContainerStyle: styles.flatList,
            showsVerticalScrollIndicator: false,
            renderItem: ({ item }) => (<ContactBox onPress={() => onCardPress(item)} contact={item} />),
            numColumns: 2,
            keyExtractor: (ite, index) => (index),
            onScroll: handleScroll,
            scrollEventThrottle: 16,
            refreshControl:
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        },
        touchableOpacity: {
            disabled: isLoading,
            onPress: onBtnPress,
            style: styles.btn,
        }

    }

    const renderContacts = () => {
        return isLoading ? <Loader /> : <Animated.FlatList {...params.flatList} />
    }

    return (
        <View style={styles.container}>
            <HomeScreenHeader scrollY={offset} />
            {renderContacts()}
            <TouchableOpacity {...params.touchableOpacity} >
                <Text style={styles.btnText}>{strings.homeScreen_btnText}</Text>
                <Image source={imageIndex.search()} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flatList: {
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        width: sizes.PageWidth,
        flexDirection:"row",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.homeScreenBtn,
    },
    btnText: {
        color: Colors.text,
        fontSize: 18
    },
    icon:{
        width:30,
        height:30,
        marginHorizontal:10
    }
});
