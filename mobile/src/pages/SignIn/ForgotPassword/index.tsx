import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { Input } from '../../../components/Form'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'

interface Credentials {
  email: string
}

export default function ForgotMyPassword() {
  const [isRequested, setIsRequested] = useState(false)

  const { colors } = useCustomTheme()

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  function handleNavigateToRecoverPassword() {
    navigation.navigate('RecoverPassword' as never)
  }

  async function handleSubmit(credentials: Credentials) {
    const { email } = credentials

    const data = { email }

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('O campo e-mail precisa ser um e-mail válido!')
          .max(80, 'No máximo 80 caracteres!')
          .required('O campo email é obrigatório!')
      })

      await schema.validate(credentials, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      setIsRequested(true)

      await api.post('esqueci_minha_senha', data).then(() => {
        handleNavigateToRecoverPassword()
      }).catch(error => {
        setIsRequested(false)

        const apiErrorMessage = error.response.data.erro

        formRef.current?.setFieldError('email', apiErrorMessage)
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

    <ScrollView>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          icon="email"
          name="email"
          maxLength={80}
          keyboardType="email-address"
          autoCapitalize="words"
          returnKeyType="next"
          textContentType="emailAddress"
          onSubmitEditing={() => {
            setIsRequested(true)

            formRef.current?.submitForm()
          }}
        />
      </Form>

      <CustomButton
        title="Próximo"
        backgroundColor={colors.buttonPrimaryBackground}
        color={colors.buttonText}
        height={50}
        fontSize={18}
        isRequested={isRequested}
        onPress={() => {
          formRef.current?.submitForm()
        }}
      />
    </ScrollView>
  )
}
