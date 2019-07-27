import React, { useState, useEffect, PropsWithChildren } from 'react';
import { View, Dimensions, Text, TouchableWithoutFeedback, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import LoadingView from './LoadingView';

interface ModalInterface {
  field: string,
  value: string,
  accept: Function,
  cancel: Function
}

const ModalField: React.FC<ModalInterface> = ({ field, value, accept, cancel }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(value);

  return (
    /* A lo mejor hay que cambiar este componente xd Es que aja ninguno sirvio como esperaba ps */
    <TouchableHighlight style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignItems: 'center', 
      justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute', zIndex: 5 }} onPress={() => cancel()}>
      <View style={{ width: '100%', height: 130, backgroundColor: '#FFF', borderRadius: 0 /* change this */, alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
        <Text style={{ fontFamily: 'Lato Light', fontSize: 12, paddingBottom: 5, marginTop: 10 }}>Enter your {field.toLowerCase()}</Text>
        <Input 
          containerStyle={{ width: '65%', backgroundColor: '#FFF', height: 35, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#36C899' }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{ fontFamily: 'Lato' }}
          autoCapitalize='none'
          onChange={(event) => setInput(event.nativeEvent.text) }
          value={input}
          spellCheck={false}
        />
        <View style={{ flexDirection: 'row' }}>
          <Button title='Cancel' containerStyle={{ padding: 10, paddingBottom: 0 }} buttonStyle={{ backgroundColor: 'transparent', height: 40 }} 
            titleStyle={{ fontFamily: 'Lato', color: '#36C899', fontSize: 18 }} onPress={() => cancel() }/>

          <Button title='Accept' containerStyle={{ padding: 10, paddingBottom: 0 }} buttonStyle={{ backgroundColor: 'transparent', height: 40 }} 
            titleStyle={{ fontFamily: 'Lato', color: '#36C899', fontSize: 18 }}
            onPress={() => accept(field, input.toLowerCase() !== value.toLowerCase() ? input: undefined) } />
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default ModalField;