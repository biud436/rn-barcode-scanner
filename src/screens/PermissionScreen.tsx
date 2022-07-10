/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../navigators/utils';
import {RootState} from '../store';
import {check, PERMISSIONS} from 'react-native-permissions';
import {setCameraPermission, setLocationPermission} from '../store/permission';
import SendIntentAndroid from 'react-native-send-intent';
import nfcManager from 'react-native-nfc-manager';

export function PermissionScreen() {
    const permissionState = useSelector((state: RootState) => state.permission);
    const dispatch = useDispatch();

    // const isAndroid = useMemo(() => Platform.OS === 'android', []);

    const isAllGranted = () => {
        return (
            permissionState.camera.isGranted &&
            permissionState.location.isGranted
        );
    };

    useEffect(() => {
        if (isAllGranted()) {
            navigate('Home');
        }
    }, [permissionState.camera.isGranted, permissionState.location.isGranted]);

    useEffect(() => {
        if (isAllGranted()) {
            navigate('Home');
        }
    }, []);

    const requestPermission = async (kind: 'camera' | 'location' | 'nfc') => {
        try {
            console.log('안드로이드 OK');

            switch (kind) {
                case 'camera':
                    {
                        console.log('카메라 권한 체크');
                        const granted = await check(PERMISSIONS.ANDROID.CAMERA);
                        console.log('카메라 권한 체크', granted);

                        if (granted === 'denied') {
                            Alert.alert('권한을 승인해주세요');
                            SendIntentAndroid.openSettings(
                                'android.settings.APPLICATION_SETTINGS',
                            );
                            dispatch(setLocationPermission(false));
                            return;
                        }

                        dispatch(setCameraPermission(granted));
                    }
                    break;
                case 'location':
                    {
                        const granted = await check(
                            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                        );
                        console.log('위치 권한 체크', granted);

                        if (granted === 'granted') {
                            dispatch(setLocationPermission(true));
                        } else if (['denied'].includes(granted)) {
                            Alert.alert(
                                '권한을 승인해주세요',
                                '위치 정보를 사용하려면 권한을 승인해주세요',
                                [
                                    {text: '취소', style: 'cancel'},
                                    {
                                        text: '승인',
                                        onPress: () => {
                                            SendIntentAndroid.openSettings(
                                                'android.settings.LOCATION_SOURCE_SETTINGS',
                                            );
                                        },
                                    },
                                ],
                            );

                            dispatch(setLocationPermission(false));
                        }
                    }
                    break;
                case 'nfc':
                    if (Platform.OS === 'android') {
                        const granted =
                            (await nfcManager.isEnabled()) &&
                            (await nfcManager.isSupported());
                        console.log('NFC 권한 체크', granted);
                        if (!granted) {
                            Alert.alert(
                                '권한을 승인해주세요',
                                'NFC를 사용하려면 권한을 승인해주세요',
                                [
                                    {text: '취소', style: 'cancel'},
                                    {
                                        text: '승인',
                                        onPress: () => {
                                            SendIntentAndroid.openSettings(
                                                'android.settings.NFC_SETTINGS',
                                            );
                                        },
                                    },
                                ],
                            );
                        }
                    }
                    break;
            }
        } catch (e) {
            console.warn(e);
        }
    };

    if (!isAllGranted()) {
        return (
            <View style={styles.container}>
                <List.Item
                    title="카메라 권한"
                    description="카메라 권한"
                    left={props => <List.Icon {...props} icon="camera" />}
                    onPress={async () => await requestPermission('camera')}
                />
                <List.Item
                    title="위치 권한"
                    description="위치 권한"
                    left={props => <List.Icon {...props} icon="camera" />}
                    onPress={async () => await requestPermission('location')}
                />
                <List.Item
                    title="NFC 권한"
                    description="NFC 권한"
                    left={props => <List.Icon {...props} icon="camera" />}
                    onPress={async () => await requestPermission('nfc')}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>권한이 있습니다</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
});
