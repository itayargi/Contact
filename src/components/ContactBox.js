import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import sizes from '../utils/sizes';
import Colors from '../utils/Colors';

const ContactBox = (props) => {
    const { contact, onPress } = props
    const { picture, name, phone } = contact
    const imageSource = { uri: picture.medium }
    const fullName = `${name.first} ${name.last}`

    return (
        <TouchableOpacity onPress={onPress} style={styles.box}>
            <Image resizeMode='contain' style={styles.image} source={imageSource} />
            <Text numberOfLines={1} style={styles.text}>{fullName}</Text>
            <Text numberOfLines={1} style={styles.text}>{phone}</Text>
        </TouchableOpacity>
    );
};

export default ContactBox;

const styles = StyleSheet.create({
    box: {
        width: sizes.PageWidth * 0.42,
        height: sizes.PageHieght * 0.25,
        paddingHorizontal: 10,
        alignItems: "center",
        margin: 15,
        backgroundColor: Colors.cardBackground,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    image: {
        width: "90%",
        height: "70%"
    },
    text: {
        fontSize: 17,
        color: Colors.text
    }
});
