import React, { useEffect, useRef, useState } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import { useField } from '@unform/core';

interface ImagePickerInputProps {
  name: string;
};

export default function ImagePickerInput({name}: ImagePickerInputProps) {
  const [image, setImage] = useState<string>('');

  const { fieldName, registerField, error } = useField(name);

  const imagePickerRef = useRef(null);

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
          { error && <Text style={styles.errorMessage}>{error}</Text>}
          <TouchableOpacity 
            ref={imagePickerRef}
            style={error ? styles.error : styles.imageInput} 
            onPress={handleSelectImages}
          >
            <Icon name="add" size={30} color="#7A7A7A" />
            <Text style={styles.imageInputText}>Sua foto</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#222325',
    borderStyle: 'dashed',
    borderWidth: 1.4,
    borderColor: "#c52626",
    margin: 15,
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

  },

  errorMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#c52626",
  },

  imageInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageInput: {
    backgroundColor: '#222325',
    borderStyle: 'dashed',
    borderColor: '#7A7A7A',
    borderWidth: 1.4,
    margin: 15,
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageInputText: {
    color: "#7A7A7A",
    fontFamily: "Roboto_400Regular",
    fontSize: 15,
  },

  uploadedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadedImage: {
    margin: 15,
    width: 150,
    height: 150,
    borderRadius: 100,
  }
});