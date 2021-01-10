import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface PreviewImageProps {
    onSelectResult?: any;
    imageUri: string;
}

const PreviewImage: React.FC<PreviewImageProps> = (props) => {
  return (

      <View style={{ flex: 1, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
              style={{ backgroundColor: 'red', height: 40, width: 80, borderRadius: 90 }}
              onPress={() => {
                  props.onSelectResult({
                      acceptImage: true
                  })
              }}>

              <Text>Fechar</Text>
          </TouchableOpacity>

          <Image
              style={{
                  width: '100%',
                  height: 300,
                  resizeMode: 'contain',
                  borderWidth: 1,
                  borderColor: 'red'
              }}
              source={{ uri: props.imageUri }}
          />
          
      </View>
  );
}

export default PreviewImage;