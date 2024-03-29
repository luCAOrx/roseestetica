import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, ScrollView, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'

import { MaterialIcons as Icon } from '@expo/vector-icons'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { ImagePicker, Input, InputMask } from '../../../components/Form/index'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'
import { useAuth } from '../../../contexts/auth'
import { useSuccessScreen } from '../../../contexts/successScreen'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'
import styles from '../styles/ChangePersonalData'

interface PersonalData {
  foto: string
  nome: string
  telefone: string
  celular: string
}

export default function ChangePersonalData() {
  const { cliente, imagem_url, updateProfile, updatePhoto, requestRefreshToken } = useAuth()

  const { colors } = useCustomTheme()

  const formRef = useRef<FormHandles>(null)
  const phoneNumberInputRef = useRef<TextInput>(null)
  const cellPhoneNumberInputRef = useRef<TextInput>(null)
  const modalizeRef = useRef<Modalize>(null)

  const [isRequested, setIsRequested] = useState(false)
  const [isUploadingImage, setUploadingImage] = useState(false)

  const {
    handleShowSuccessMessage,
    handleTitleSuccessMessage
  } = useSuccessScreen()

  useEffect(() => {
    formRef.current?.setData({
      nome: cliente?.nome,
      cpf: cliente?.cpf,
      telefone: cliente?.telefone,
      celular: cliente?.celular,
      sexo: cliente?.sexo
    })
  }, [])

  const onOpen = () => {
    modalizeRef.current?.open()
  }

  const onClose = () => {
    modalizeRef.current?.close()
  }

  async function handleSubmit(personalData: PersonalData) {
    const threeSeconds = 3000

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    const regexNumeros = /^([0-9]|\s+)+$/

    let { nome, telefone, celular } = personalData

    const data = { nome, telefone, celular }

    if (data.telefone === '(') data.telefone = ''

    try {
      const schema = Yup.object().shape({
        nome: Yup.string()
          .matches(regexLetras, 'O campo nome completo só aceita letras!')
          .min(5, 'No mínimo 5 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo nome é obrigatório!'),
        telefone: Yup.string()
          .matches(/.{10,}/, {
            excludeEmptyString: true,
            message: 'No mínimo 10 caracteres!'
          })
          .max(10, 'No máximo 10 caracteres!')
          .notRequired(),
        celular: Yup.string()
          .matches(regexNumeros, 'O campo celular não aceita letras!')
          .min(11, 'No mínimo 11 caracteres!')
          .max(11, 'No máximo 11 caracteres!')
          .required('O campo número de celular é obrigatório!')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      nome = nome.trim()

      setIsRequested(true)

      await api.put(`atualizar_dados_pessoais/${cliente.id}`, data).then(response => {
        setIsRequested(false)
        updateProfile(response.data.cliente)

        handleTitleSuccessMessage('Dados pessoais atualizados')
        handleShowSuccessMessage(true)

        setTimeout(() => {
          handleShowSuccessMessage(false)
        }, threeSeconds)
      }).catch(async error => {
        const apiErrorMessage = error.response.data.erro

        if (error.response.status === 401) {
          await requestRefreshToken()
          formRef.current?.submitForm()
        }

        if (error.response.status === 400) {
          setIsRequested(false)

          Alert.alert('Erro', apiErrorMessage)
        }
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setIsRequested(false)

        const errors = getValidationErros(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  async function handleUpdateImage(personalData: PersonalData) {
    const { foto } = personalData

    const threeSeconds = 3000

    const data = new FormData()

    const localUri = foto
    const filename = localUri.split('/').pop()

    const match = /\.(\w+)$/.exec(String(filename))
    const type = match ? `image/${match[1]}` : 'image/jpg'

    try {
      const schema = Yup.object().shape({
        foto: Yup.string().required('O campo foto é obrigatório.')
      })

      await schema.validate(personalData, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      data.append('foto', {
        name: filename,
        type,
        uri: foto
      } as any)

      setUploadingImage(true)

      await api.post(`atualizar_foto/${cliente.id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }
      ).then(response => {
        setUploadingImage(false)

        updatePhoto(response.data.imagem_url)

        onClose()

        handleTitleSuccessMessage('Foto do perfil atualizada')
        handleShowSuccessMessage(true)

        setTimeout(() => {
          handleShowSuccessMessage(false)
        }, threeSeconds)
      }).catch(async error => {
        const apiErrorMessage = error.response.data.erro

        if (error.response.status === 401) {
          await requestRefreshToken()
          formRef.current?.submitForm()
        }

        if (error.response.status === 400) {
          setUploadingImage(false)

          Alert.alert('Erro', apiErrorMessage)
        }
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setUploadingImage(false)

        const errors = getValidationErros(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <>
      <ScrollView style={{ flexGrow: 1 }}>
        <Form
          ref={formRef}
          initialData={Object(cliente)}
          onSubmit={handleSubmit}
        >
          <Header title="Dados pessoais" showIcon fontSize={26} />

          <View style={styles.imageProfileContainer}>
            <Image
              style={styles.imageProfile}
              source={{ uri: imagem_url }}
            />

            <CustomButton
              title="Alterar foto do perfil"
              backgroundColor={colors.buttonSecondaryBackground}
              color={colors.buttonText}
              height={35}
              width={170}
              fontSize={15}
              marginBottom={50}
              onPress={onOpen}
            />
          </View>

          <Input
            placeholder="Nome completo"
            icon="person"
            name="nome"
            maxLength={90}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
            blurOnSubmit={false}
          />

          <InputMask
            placeholder="CPF"
            type="cpf"
            icon="fingerprint"
            name="cpf"
            editable={false}
            keyboardType="numeric"
            returnKeyType="next"
          />

          <InputMask
            ref={phoneNumberInputRef}
            type="cel-phone"
            placeholder="Número de Telefone (opcional)"
            icon="local-phone"
            name="telefone"
            keyboardType="number-pad"
            returnKeyType="next"
            maxLength={14}
            onSubmitEditing={() => cellPhoneNumberInputRef.current?.focus()}
            blurOnSubmit={false}
          />

          <InputMask
            ref={cellPhoneNumberInputRef}
            type="cel-phone"
            placeholder="Número de celular"
            icon="phone-android"
            name="celular"
            maxLength={15}
            keyboardType="number-pad"
          />

          <Input
            icon="face"
            placeholder="Sexo"
            name="sexo"
            editable={false}
          />

          <CustomButton
            title="Atualizar"
            backgroundColor={colors.buttonPrimaryBackground}
            color={colors.buttonText}
            height={50}
            fontSize={18}
            isRequested={isRequested}
            onPress={() => {
              formRef.current?.submitForm()

              setIsRequested(true)
            }}
          />
        </Form>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        snapPoint={300}
        modalHeight={300}
        modalStyle={[
          styles.modal,
          { backgroundColor: colors.background }
        ]}
        withHandle={false}
        HeaderComponent={
          <View style={styles.headerModalContainer}>
            <TouchableOpacity onPress={onClose}>
              <Icon name='close' size={30} color="#ff669d" />
            </TouchableOpacity>

            <Text
              style={[
                styles.title,
                { color: colors.text }
              ]}
            >
              Alterar foto do perfil
            </Text>

            <TouchableOpacity
              onPress={() => {
                formRef.current?.submitForm()
              }}
            >
              {isUploadingImage
                ? <Loading />
                : <Icon name='done' size={30} color="#34CB79" />
              }
            </TouchableOpacity>
          </View>
        }
      >
        <Form ref={formRef} onSubmit={handleUpdateImage}>
          <ImagePicker name="foto" />
        </Form>
      </Modalize>
    </>
  )
}
