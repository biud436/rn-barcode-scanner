import React, {useCallback} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import nfcManager, {NfcTech} from 'react-native-nfc-manager';

nfcManager.start();

export default function NfcReader() {
  const readNdef = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        await nfcManager.requestTechnology(NfcTech.Iso15693IOS);
      } else if (Platform.OS === 'android') {
        await nfcManager.requestTechnology(NfcTech.NfcV);
      }
      const tag = await nfcManager.getTag();

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
