import React from 'react';
import { Avatar, List, Text } from 'react-native-paper';
import { Alert, Image, View } from 'react-native';
import { Task } from '@store/task.slice';
import { Images } from '@assets';

function CallImageAPI(data) {
    switch (data) {
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
        default:
            return Images.Avatar.AVATARF
    }
}

function TaskAvatar({ data }) {
    return (
        <Avatar.Image source={CallImageAPI(data[0])} />
    )
}

function TaskAvatar2({ data }) {
    return (
        <View style={{ width: 60, height: 60, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: 40, height: 40, borderRadius: 100, marginTop: 20, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={40} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: 40, height: 40, borderRadius: 100, marginLeft: 20 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={40} />
            </View>
        </View>
    )
}

function TaskAvatar3({ data }) {
    return (
        <View style={{ width: 60, height: 60, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: 35, height: 35, borderRadius: 100, marginLeft: 12.5, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={35} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={35} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25, marginLeft: 25 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={35} />
            </View>
        </View>
    )
}

function TaskAvatar4({ data }) {
    return (
        <View style={{ width: 60, height: 60, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: 35, height: 35, borderRadius: 100, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={35} />
            </View>
            <View style={{ backgroundColor: "#AA00FF", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginLeft: 25 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={35} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={35} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25, marginLeft: 25 }}>
                <Avatar.Image source={CallImageAPI(data[3])} size={35} />
            </View>
        </View>
    )
}

function TaskAvatar5({ data }) {
    return (
        <View style={{ width: 60, height: 60, flexDirection: "row" }}>
            <View style={{ backgroundColor: "#E51400", width: 35, height: 35, borderRadius: 100, position: 'absolute' }}>
                <Avatar.Image source={CallImageAPI(data[0])} size={35} />
            </View>
            <View style={{ backgroundColor: "#AA00FF", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginLeft: 25 }}>
                <Avatar.Image source={CallImageAPI(data[1])} size={35} />
            </View>
            <View style={{ backgroundColor: "#008A00", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25 }}>
                <Avatar.Image source={CallImageAPI(data[2])} size={35} />
            </View>
            <View style={{ backgroundColor: "#FA6800", width: 35, height: 35, borderRadius: 100, position: 'absolute', marginTop: 25, marginLeft: 25, alignItems: "center", justifyContent: "center" }}>
                <Text>{data.length - 3}</Text>
            </View>
        </View>
    )
}

export function TaskRenderAvatar({ data }) { 
    const m=Array.isArray(data)? data.length: 1;
    console.log(m + " Data " + data);
    
    switch (m) {
        case 1:
            return (
                <TaskAvatar data={data}></TaskAvatar>
            )
        case 2:
            return (
                <TaskAvatar2 data={data}></TaskAvatar2>
            )
        case 3:
            return (
                <TaskAvatar3 data={data}></TaskAvatar3>
            )
        case 4:
            return (
                <TaskAvatar4 data={data}></TaskAvatar4>
            )
        default:
            return (
                <TaskAvatar5 data={data}></TaskAvatar5>
            )
    }
}