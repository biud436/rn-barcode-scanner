/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export function Grid() {
  const [dt] = useState<number>();

  const items: JSX.Element[] = useMemo(() => {
    const components = [];

    for (let i = 0; i < 6; i++) {
      const color = i % 2 === 0 ? '#efefef' : '#d2d2d2';

      components.push(
        <View key={i} style={styles.gridBlock}>
          <TouchableOpacity
            style={{backgroundColor: `${color}`, width: '100%', height: 10}}
          />
        </View>,
      );
    }

    return components;
  }, [dt]);

  return <View>{items}</View>;
}

const styles = StyleSheet.create({
  gridBlock: {
    width: '100%',
    height: 10,
    backgroundColor: 'white',
  },
});
