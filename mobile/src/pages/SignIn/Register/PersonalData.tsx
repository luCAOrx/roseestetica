import React, { useRef } from 'react'
import { ScrollView, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { useTheme } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { Input, InputMask, Select, ImagePicker } from '../../../components/Form'
import Header from '../../../components/Header'
import getValidationErros from '../../../utils/handleErrors'

interface PersonalDataProps {
  foto: string
  nome: string
  cpf: string
  telefone: string
  celular: string
  sexo_id: number[]
}

export default function PersonalData() {
  const formRef = useRef<FormHandles>(null)
  const cpfInputRef = useRef<TextInput>(null)
  const phoneNumberInputRef = useRef<TextInput>(null)
  const cellPhoneNumberInputRef = useRef<TextInput>(null)

  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleNavigateToAddress(personalData: PersonalDataProps) {
    const { foto, nome, cpf, telefone, celular, sexo_id } = personalData

    navigation.navigate('Address' as never, {
      foto, nome, cpf, telefone, celular, sexo_id
    } as never)
  }

  async function handleSubmit(personalData: PersonalDataProps) {
    let { foto, nome, cpf, telefone, celular, sexo_id } = personalData

    if (telefone === undefined || telefone === '(') telefone = ''

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    try {
      const schema = Yup.object().shape({
        foto: Yup.string().required('O campo foto é obrigatório.'),
        nome: Yup.string().strict(true)
          .trim('Não são permitidos espaços no começo ou no fim!')
          .matches(regexLetras, 'O campo nome completo só aceita letras!')
          .min(5, 'No mínimo 5 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo nome é obrigatório!'),
        cpf: Yup.string().required('O campo CPF é obrigatório!')
          .min(11, 'No mínimo 11 caracteres!')
          .max(11, 'No máximo 11 caracteres!'),
        telefone: Yup.string()
          .matches(/.{10,}/, {
            excludeEmptyString: true,
            message: 'No mínimo 10 caracteres!'
          })
          .max(10, 'No máximo 10 caracteres!')
          .notRequired(),
        celular: Yup.string().required('O campo número de celular é obrigatório!')
          .min(11, 'No mínimo 11 caracteres!')
          .max(11, 'No máximo 11 caracteres!'),
        sexo_id: Yup.string().required('O campo sexo é obrigatório!')
      })

      await schema.validate({ foto, nome, cpf, telefone, celular, sexo_id }, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      handleNavigateToAddress({ foto, nome, cpf, telefone, celular, sexo_id })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err)

        formRef.current?.setErrors(errors)
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Form
        ref={formRef}
        style={{ flexGrow: 1 }}
        onSubmit={handleSubmit}
      >
        <Header title="Dados pessoais" showIcon showStep fontSize={26} />
        {/* <View style={{marginTop: 20}}/> */}

        <ImagePicker name="foto" />

        <Input
          placeholder="Nome completo"
          icon="person"
          name="nome"
          maxLength={90}
          returnKeyType="next"
          onSubmitEditing={() => cpfInputRef.current?.focus()}
          blurOnSubmit={false}
        />

        <InputMask
          ref={cpfInputRef}
          type="cpf"
          placeholder="CPF"
          icon="fingerprint"
          name="cpf"
          maxLength={14}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
          blurOnSubmit={false}
        />

        <InputMask
          ref={phoneNumberInputRef}
          type="cel-phone"
          placeholder="Número de telefone (opcional)"
          icon="local-phone"
          name="telefone"
          maxLength={14}
          keyboardType="number-pad"
          returnKeyType="next"
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

        <Select
          icon="face"
          name="sexo_id"
          placeholder="Sexo"
          modalHeight={140}
          snapPoint={155}
          isGender
        />

        <CustomButton
          title="Próximo"
          backgroundColor={colors.buttonSecondaryBackground}
          color={colors.buttonText}
          height={50}
          marginBottom={50}
          fontSize={18}
          onPress={() => {
            formRef.current?.submitForm()
          }}
        />
      </Form>
    </ScrollView>
  )
}
