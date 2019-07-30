import React, { useState } from 'react';
import { View, Dimensions, Text, Modal } from 'react-native';
import { Button, Input } from 'react-native-elements';

interface ModalInterface {
  field: string,
  value: string,
  accept: Function,
  cancel: Function,
  long?: boolean
}

const ModalField: React.FC<ModalInterface> = ({ field, value, accept, cancel, long }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(value);
  
  return (
    <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignItems: 'center', 
      justifyContent: 'center', backgroundColor: 'transparent', position: 'absolute', zIndex: 2 }} >
      <Modal animationType='slide' transparent={true} visible={true}>
        <View style={{ width: '100%', height: 130, backgroundColor: '#FFF', borderRadius: 0 /* change this */, alignItems: 'center', justifyContent: 'center', zIndex: 10,
          position: 'absolute', left: 0, bottom: 0 }}>
            <Text style={{ fontFamily: 'Lato Light', fontSize: 12, paddingBottom: 5, marginTop: 10 }}>Enter your {field.toLowerCase()}</Text>
            <Input 
              containerStyle={{ width: long ? '90%' : '65%', backgroundColor: '#FFF', height: 35, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#36C899' }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={{ fontFamily: 'Lato' }}
              autoCapitalize='none'
              onChange={(event) => setInput(event.nativeEvent.text) }
              value={input}
              spellCheck={false}
              autoFocus={true}
              maxLength={long ? 140 : 25 }
            />
            <View style={{ flexDirection: 'row' }}>
              <Button title='Cancel' containerStyle={{ padding: 10, paddingBottom: 0 }} buttonStyle={{ backgroundColor: 'transparent', height: 40 }} 
                titleStyle={{ fontFamily: 'Lato', color: '#36C899', fontSize: 18 }} onPress={() => cancel() }/>
              <Button title='Accept' containerStyle={{ padding: 10, paddingBottom: 0 }} buttonStyle={{ backgroundColor: 'transparent', height: 40 }} 
                titleStyle={{ fontFamily: 'Lato', color: '#36C899', fontSize: 18 }}
                onPress={() => accept(field, input.toLowerCase() !== value.toLowerCase() ? input: undefined) } />
            </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalField;