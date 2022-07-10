/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../navigators/utils';
import {RootState} from '../store';
import {check, PERMISSIONS} from 'react-native-permissions';
import {setCameraPermission, setLocationPermission} from '../store/permission';

export function PermissionScreen() {
    const permissionState = useSelector(
        (state: RootState) => state.permission,
    ) as RootState['permission'];
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
                        dispatch(setCameraPermission(granted));
                    }
                    break;
                case 'location':
                    {
                        const granted = await check(
                            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                        );
                        console.log('위치 권한 체크', granted);
                        dispatch(setLocationPermission(granted));
                    }
                    break;
                // 지원하지 않음
                // case 'nfc':
                //     if (isAndroid && Platform.Version >= 23) {
                //         const granted = await PermissionsAndroid.request(
                //             PermissionsAndroid.PERMISSIONS.NFC,
                //             {
                //                 title: 'NFC 권한 요청',
                //                 message: 'NFC 권한이 필요합니다.',
                //                 buttonPositive: '허용',
                //             },
                //         );

                //         console.log(granted);

                //         if (PermissionsAndroid.RESULTS.GRANTED === granted) {
                //             Alert.alert('NFC 권한이 승인되었습니다.');
                //         }
                //     }
                //     break;
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
