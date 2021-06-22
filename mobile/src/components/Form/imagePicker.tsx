import React, { useEffect, useRef, useState } from 'react';

import { Image, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import styles from './styles/imagePicker';

import * as ImagePicker from 'expo-image-picker';

import { useField } from '@unform/core';

import { useTheme } from '@react-navigation/native';

interface ImagePickerInputProps {
  name: string;
};

export default function ImagePickerInput({name}: ImagePickerInputProps) {
  const [image, setImage] = useState('');

  const { fieldName, registerField, error } = useField(name);

  const imagePickerRef = useRef(null);

  const {colors} = useTheme();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita precisamos de acesso ás suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImage(image);
  };
  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: imagePickerRef.current,
      getValue() {
        return image;
      }
    });
  }, [fieldName, image, registerField]);

  return (
    <>
      {image ? (
        <View style={styles.uploadedImageContainer}>
          <Image 
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        </View>
      ) : (
        <View style={styles.imageInputContainer}>
          <TouchableOpacity 
            ref={imagePickerRef}
            style={[
              styles.imageInput,
              {
                backgroundColor: colors.card,
                borderColor: colors.primary
              }
            ]} 
            onPress={handleSelectImages}
          >
            <Icon name="add" size={30} color={colors.primary} />
            <Text 
              style={[
                styles.imageInputText,
                {color: colors.primary}
              ]}
            >
                Sua foto
              </Text>
          </TouchableOpacity>
          { error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
      )}
    </>
  );
};