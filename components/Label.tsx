import React from 'react'
import { View, Text } from 'react-native';
import { getDate } from '../utils';

interface LabelProps {
  time: number
}

const Label: React.FC<LabelProps> = ({ time }) => {
  return (
    <View style={{ width: '100%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ maxWidth: '20%', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, backgroundColor: '#DAECF1' }}>
        <Text style={{ fontFamily: 'Lato Bold',  }}>{getDate(time)}</Text>
      </View>
    </View>
  );
}

export default Label;