import React from 'react';
import { Avatar, List, Text } from 'react-native-paper';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Task } from '@store/task.slice';
import { Images } from '@assets';

function CallImageAPI(data) {
    switch (data) {
        case "000":
            return Images.Avatar.AVATARF
        case "001":
            return Images.Avatar.AVATARA
        case "002":
            return Images.Avatar.AVATARB
        case "003":
            return Images.Avatar.AVATARC
        case "004":
            return Images.Avatar.AVATARD
        case "005":
            return Images.Avatar.AVATARE
        case "006":
            return Images.Avatar.AVATARF
    }
}

function TaskAvatar({ data, size }) {
    //console.log(data);
    const src = Array.isArray(data) ? data[0] : data;
    return (
        <View style={{}}>
            <Avatar.Image source={CallImageAPI(src)} size={size} />
        </View>
    )
}

function TaskAvatar2({ data, size }) {
    return (
        <View style={{ width: size, height: size, flexDirection: "row"}}>
            <View style={{ backgroundColor: "#E51400", width: size * 0.65, height: size * 0.65, borderRadius: 100, marginTop: size * 0.35, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={size * 0.65} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: size * 0.65, height: size * 0.65, borderRadius: 100, marginLeft: size * 0.35 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={size * 0.65} />
            </View>
        </View>
    )
}

function TaskAvatar3({ data, size }) {
    return (
        <View style={{ width: size, height: size, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: size * 0.6, height: size * 0.6, borderRadius: 100, marginLeft: size * 0.25, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4, marginLeft: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={size * 0.6} />
            </View>
        </View>
    )
}

function TaskAvatar4({ data, size }) {
    return (
        <View style={{ width: size, height: size, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#AA00FF", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginLeft: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4, marginLeft: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[3])} size={size * 0.6} />
            </View>
        </View>
    )
}

function TaskAvatar5({ data, size }) {
    return (
        <View style={{ width: size, height: size, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#AA00FF", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginLeft: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={size * 0.6} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: size * 0.6, height: size * 0.6, borderRadius: 100, position: 'absolute', marginTop: size * 0.4, marginLeft: size * 0.4, alignItems: "center", justifyContent: "center" }}>
                <Text>{data.length - 3}</Text>
            </View>
        </View>
    )
}

export function TaskRenderAvatar({ data, size }) {
    const length = Array.isArray(data) ? data.length : 1;
    //data = [Images.Avatar.AVATARF, Images.Avatar.AVATARE,Images.Avatar.AVATARC]
    //console.log(data);

    switch (length) {
        case 1:
            return (
                <TaskAvatar data={data} size={size}></TaskAvatar>
            )
        case 2:
            return (
                <TaskAvatar2 data={data} size={size}></TaskAvatar2>
            )
        case 3:
            return (
                <TaskAvatar3 data={data} size={size}></TaskAvatar3>
            )
        case 4:
            return (
                <TaskAvatar4 data={data} size={size}></TaskAvatar4>
            )
        default:
            return (
                <TaskAvatar5 data={data} size={size}></TaskAvatar5>
            )
    }
}

const styleAvatar = StyleSheet.create({


})