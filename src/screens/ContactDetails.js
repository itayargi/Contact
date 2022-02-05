import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import sizes from '../utils/sizes';
import strings from '../utils/strings';

const ContactDetails = ({ navigation, route }) => {
    const { contact } = route.params;
    const { picture, name, location, email, phone } = contact
    const imageSource = { uri: picture.large }
    const fullName = `${name.first} ${name.last}`
    const address = `${location.street.number} ${location.street.name}, ${location.city}, ${location.state}`

    const contactDataArr = [
        {
            title: strings.contactDetail_Name,
            data: fullName
        },
        {
            title: strings.contactDetail_Email,
            data: email
        },
        {
            title:strings.contactDetail_Address,
            data: address
        },
        {
            title: strings.contactDetail_Phone,
            data: phone
        },
    ]
    const renderContactData = (dataArr = []) => {
        return dataArr?.map((dataObj, index) => (
            <View key={index} style={styles.dataBox}>
                <Text style={styles.dataHeader}>{dataObj.title}</Text>
                <Text style={styles.dataText}>{dataObj.data}</Text>
            </View>
        ))
    }
    const params = {
        scroll: {
            contentContainerStyle: styles.container,
        },
        image: {
            resizeMode: 'contain',
            style: styles.image,
            source: imageSource
        }
    }
    return (
        <ScrollView {...params.scroll} >
            <Image {...params.image} />
            {renderContactData(contactDataArr)}
        </ScrollView>
    );
};

export default ContactDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 40,
        backgroundColor: Colors.whiteBackground
    },
    image: {
        width: "60%",
        height: "50%"
    },
    text: {
        fontSize: 18,
        color: Colors.text
    },
    dataBox: {
        width: sizes.PageWidth * 0.9,
        height: 60,
        backgroundColor: Colors.contactDetailDataBox,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 7
    },
    dataHeader: {
        fontSize: 19,
        color: Colors.headerText,
        textDecorationLine: "underline"
    },
    dataText: {
        fontSize: 16,
        color: Colors.text,
        textAlign:"center"
    },
});
