/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import nfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {foundTag, resetFoundTag} from '../store/nfc';

nfcManager.start();

export default function NfcReader() {
  const isFound = useSelector<RootState>(state => state.nfc.isFound) as boolean;
  const dispatch = useDispatch();

  const foundNfcTag = () => {
    dispatch(foundTag());
  };

  const resetNfcTag = () => {
    dispatch(resetFoundTag());
  };

  const handleError = (message: string) => {
    resetNfcTag();

    throw new Error(message);
  };

  const readNdef = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        await nfcManager.requestTechnology(NfcTech.Iso15693IOS);
      } else if (Platform.OS === 'android') {
        await nfcManager.requestTechnology(NfcTech.NfcV);
      }
      const tag = await nfcManager.getTag();

      if (!tag) {
        throw new Error('No tag found');
      }

      foundNfcTag();

      // Read
      const cmdTestReading = [0x02, 0x20, 0x01];
      const returnedValueFromTag = await nfcManager.transceive(cmdTestReading);

      if (!returnedValueFromTag) {
        handleError('No returned value from tag');
      }

      console.warn('Tag found', tag);
    } catch (e) {
      console.log(e);
    } finally {
      nfcManager.cancelTechnologyRequest();
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>태그 스캔</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
