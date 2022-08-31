import React, { useRef, useState } from 'react'
import { View, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { Input } from '../../../components/Form/index'
import Header from '../../../components/Header'
import { useSuccessScreen } from '../../../contexts/successScreen'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'

interface Data {
  foto: string
  nome: string
  cpf: string
  telefone: string
  celular: string
  sexo_id: number
  cidade_id: number
  bairro: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
}

interface LoginDataProps {
  email: string
  senha: string
}

export default function LoginData() {
  const formRef = useRef<FormHandles>(null)
  const passwordRef = useRef<TextInput>(null)

  const { colors } = useCustomTheme()

  const {
    handleShowSuccessMessage,
    handleTitleSuccessMessage
  } = useSuccessScreen()

  const [isRequested, setIsRequested] = useState(false)

  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as Data

  function handleNavigateToSignIn() {
    navigation.navigate('SignIn' as never)
  }

  async function handleSubmit(loginData: LoginDataProps) {
    const {
      foto,
      nome,
      cpf,
      telefone,
      celular,
      sexo_id,
      cidade_id,
      bairro,
      logradouro,
      numero,
      complemento,
      cep
    } = params

    const { email, senha } = loginData

    const threeSeconds = 3000

    const data = new FormData()

    const localUri = foto
    const filename = localUri.split('/').pop()

    const match = /\.(\w+)$/.exec(String(filename))
    const type = (match != null) ? `image/${match[1]}` : 'image/jpg'

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('O campo e-mail precisa ser um e-mail válido!')
          .max(80, 'No máximo 80 caracteres!')
          .required('O campo e-mail é obrigatório!'),
        senha: Yup.string()
          .min(8, 'No mínimo 8 caracteres!')
          .max(50, 'No máximo 50 caracteres!')
          .required('O campo senha é obrigatório!')
      })

      await schema.validate(loginData, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      data.append('foto', {
        name: filename,
        type,
        uri: foto
      } as any)
      data.append('nome', nome)
      data.append('cpf', cpf)
      data.append('telefone', telefone)
      data.append('celular', celular)
      data.append('sexo_id', String(sexo_id))
      data.append('cidade_id', String(cidade_id))
      data.append('bairro', bairro)
      data.append('logradouro', logradouro)
      data.append('numero', numero)
      data.append('complemento', complemento)
      data.append('cep', cep)
      data.append('email', email)
      data.append('senha', senha)

      setIsRequested(true)

      await api.post('cadastro', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
        setIsRequested(false)
        handleTitleSuccessMessage('Cadastro concluído')
        handleShowSuccessMessage(true)

        setTimeout(() => {
          handleShowSuccessMessage(false)
          handleNavigateToSignIn()
        }, threeSeconds)
      }).catch(error => {
        setIsRequested(false)

        const apiErrorMessage = error.response.data.message

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
    <View>
      <ScrollView>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Header title="Dados de Login" showIcon showStep position={2} fontSize={26} />
          <View style={{ marginTop: 20 }} />
          <Input
            placeholder="E-mail"
            icon="email"
            name="email"
            maxLength={80}
            keyboardType="email-address"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />

          <Input
            ref={passwordRef}
            placeholder="Senha"
            icon="lock"
            name="senha"
            maxLength={50}
            isPassword
            returnKeyType="send"
            onSubmitEditing={() => {
              setIsRequested(true)

              formRef.current?.submitForm()
            }}
          />

          <CustomButton
            title="Finalizar"
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
    </View>
  )
}
