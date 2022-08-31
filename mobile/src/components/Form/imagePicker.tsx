import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'

import { MaterialIcons as Icon } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import { useField } from '@unform/core'
import * as ImagePicker from 'expo-image-picker'

import styles from './styles/imagePicker'

interface ImagePickerInputProps {
  name: string
}

export default function ImagePickerInput({ name }: ImagePickerInputProps) {
  const [image, setImage] = useState('')

  const { fieldName, registerField, error } = useField(name)

  const imagePickerRef = useRef(null)

  const { colors } = useTheme()

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      alert('Eita precisamos de acesso ás suas fotos...')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if (result.cancelled) {
      return
    }

    const { uri: image } = result

    setImage(image)
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: imagePickerRef.current,
      getValue() {
        return image
      }
    })
  }, [fieldName, image, registerField])

  return (
    <>
      {image
        ? <View style={styles.uploadedImageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.uploadedImage}
          />
        </View>

        : <View style={styles.imageInputContainer} testID="imageInputContainer">
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
            testID="imageInputButton"
          >
            <Icon name="add" size={30} color={colors.primary} />
            <Text
              style={[
                styles.imageInputText,
                { color: colors.primary }
              ]}
              testID="imageInputText"
            >
              Sua foto
            </Text>
          </TouchableOpacity>
          {error && <Text style={styles.errorMessage} testID="imagePickerErrorMessage">{error}</Text>}
        </View>
      }
    </>
  )
}
