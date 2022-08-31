import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput, Alert } from 'react-native'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { Input, InputMask, Select } from '../../../components/Form/index'
import Header from '../../../components/Header'
import { useAuth } from '../../../contexts/auth'
import { useSuccessScreen } from '../../../contexts/successScreen'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'

interface AdressData {
  cidade_id: number
  bairro: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
}

export default function ChangeAddress() {
  const { cliente, updateProfile, requestRefreshToken } = useAuth()

  const { colors } = useCustomTheme()

  const formRef = useRef<FormHandles>(null)
  const streetRef = useRef<TextInput>(null)
  const numberRef = useRef<TextInput>(null)
  const complementRef = useRef<TextInput>(null)
  const cepRef = useRef<TextInput>(null)

  const [isRequested, setIsRequested] = useState(false)

  const {
    handleShowSuccessMessage,
    handleTitleSuccessMessage
  } = useSuccessScreen()

  useEffect(() => {
    formRef.current?.setData({
      cidade_id: cliente.cidade,
      bairro: cliente.bairro,
      logradouro: cliente.logradouro,
      numero: cliente.numero,
      complemento: cliente.complemento,
      cep: cliente.cep
    })
  }, [])

  async function handleSubmit(adressData: AdressData) {
    const threeSeconds = 3000

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    const {
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep
    } = adressData

    const data = {
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep
    }

    try {
      const schema = Yup.object().shape({
        cidade_id: Yup.number().required('O campo cidade é obrigatório!'),
        bairro: Yup.string().strict(true)
          .trim('Não são permitidos espaços no começo ou no fim!')
          .matches(regexLetras, 'O campo bairro só aceita letras!')
          .min(3, 'No mínimo 3 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo bairro é obrigatório!'),
        logradouro: Yup.string().strict(true)
          .trim('Não são permitidos espaços no começo ou no fim!')
          .matches(regexLetras, 'O campo logradouro só aceita letras!')
          .min(5, 'No mínimo 5 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo logradouro é obrigatório!'),
        numero: Yup.string().strict(true)
          .trim('Não são permitidos espaços no começo ou no fim!')
          .min(1, 'No mínimo 1 caractere!')
          .max(6, 'No máximo 6 caracteres!')
          .required('O campo número é obrigatório!'),
        complemento: Yup.string().optional().strict(true)
          .matches(/.{5,}/, {
            excludeEmptyString: true,
            message: 'No mínimo 5 caracteres!'
          })
          .trim('Não são permitidos espaços no começo ou no fim!')
          .max(90, 'No máximo 90 caracteres!'),
        cep: Yup.string()
          .min(8, 'No mínimo 8 caracteres!')
          .max(8, 'No máximo 8 caracteres!')
          .required('O campo CEP é obrigatório!')
      })

      await schema.validate(adressData, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      setIsRequested(true)

      await api.put(`atualizar_endereco/${cliente?.id}`, data).then(response => {
        setIsRequested(false)

        updateProfile(response.data.cliente)

        handleTitleSuccessMessage('Endereço atualizado')
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

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Form
          style={{ flexGrow: 1 }}
          ref={formRef}
          initialData={Object(cliente)}
          onSubmit={handleSubmit}
        >
          <Header title="Endereço" showIcon fontSize={26} />
          <Select
            icon="location-city"
            placeholder={cliente.cidade}
            placeholderTextColor={colors.text}
            name="cidade_id"
            value={cliente.cidade_id}
            modalHeight={330}
            snapPoint={390}
            isGender={false}
          />

          <Input
            placeholder="Bairro"
            icon="map"
            name="bairro"
            maxLength={90}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => streetRef.current?.focus()}
            blurOnSubmit={false}
          />

          <Input
            ref={streetRef}
            placeholder="Logradouro"
            icon="home"
            name="logradouro"
            maxLength={90}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => numberRef.current?.focus()}
            blurOnSubmit={false}
          />

          <InputMask
            ref={numberRef}
            type="only-numbers"
            placeholder="Número"
            icon="looks-5"
            name="numero"
            maxLength={6}
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => complementRef.current?.focus()}
            blurOnSubmit={false}
          />

          <Input
            ref={complementRef}
            placeholder="Complemento (opcional)"
            icon="domain"
            name="complemento"
            maxLength={90}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => cepRef.current?.focus()}
            blurOnSubmit={false}
          />

          <InputMask
            ref={cepRef}
            type="zip-code"
            placeholder="CEP"
            icon="place"
            name="cep"
            keyboardType="number-pad"
            returnKeyType="send"
            onSubmitEditing={() => {
              setIsRequested(true)

              formRef.current?.submitForm()
            }}
          />

          <CustomButton
            title="Atualizar"
            backgroundColor={colors.buttonPrimaryBackground}
            color={colors.buttonText}
            height={50}
            fontSize={18}
            isRequested={isRequested}
            onPress={() => {
              setIsRequested(true)

              formRef.current?.submitForm()
            }}
          />
        </Form>
      </ScrollView>
    </>
  )
}
