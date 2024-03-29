import React, { useRef } from 'react'
import { View, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { Input, InputMask, Select } from '../../../components/Form/index'
import Header from '../../../components/Header'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'

interface PersonalData {
  foto: string
  nome: string
  cpf: string
  telefone: string
  celular: string
  sexo_id: number
}

interface Adress {
  cidade_id: number
  bairro: string
  logradouro: string
  numero: string
  complemento: string
  cep: string
}

export default function Address() {
  const formRef = useRef<FormHandles>(null)
  const streetRef = useRef<TextInput>(null)
  const numberRef = useRef<TextInput>(null)
  const complementRef = useRef<TextInput>(null)
  const cepRef = useRef<TextInput>(null)

  const { colors } = useCustomTheme()

  const navigation = useNavigation()
  const route = useRoute()
  const params = route.params as PersonalData

  function handleNavigateToLoginData(
    params: PersonalData,
    adressData: Adress
  ) {
    const { foto, nome, cpf, telefone, celular, sexo_id } = params
    const { cidade_id, bairro, logradouro, numero, complemento, cep } = adressData

    navigation.navigate('LoginData' as never, {
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
    } as never)
  }

  async function handleSubmit(adressData: Adress) {
    const { foto, nome, cpf, telefone, celular, sexo_id } = params

    let { cidade_id, bairro, logradouro, numero, complemento, cep } = adressData

    if (complemento === undefined) complemento = ''

    const regexLetras = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/

    try {
      const schema = Yup.object().shape({
        cidade_id: Yup.string().required('O campo cidade é obrigatório!'),
        bairro: Yup.string()
          .matches(regexLetras, 'O campo bairro só aceita letras!')
          .min(3, 'No mínimo 3 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo bairro é obrigatório!'),
        logradouro: Yup.string()
          .matches(regexLetras, 'O campo logradouro só aceita letras!')
          .min(5, 'No mínimo 5 caracteres!')
          .max(90, 'No máximo 90 caracteres!')
          .required('O campo logradouro é obrigatório!'),
        numero: Yup.string()
          .min(1, 'No mínimo 1 caractere!')
          .max(6, 'No máximo 6 caracteres!')
          .required('O campo número é obrigatório!'),
        complemento: Yup.string().optional()
          .matches(/.{5,}/, {
            excludeEmptyString: true,
            message: 'No mínimo 5 caracteres!'
          })
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

      bairro = bairro.trim()
      logradouro = logradouro.trim()
      complemento = complemento.trim()

      handleNavigateToLoginData({
        foto, nome, cpf, telefone, celular, sexo_id
      }, {
        cidade_id, bairro, logradouro, numero, complemento, cep
      })
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
        <Header title="Endereço" showIcon showStep position={1} fontSize={26} />
        <View style={{ marginTop: 20 }} />
        <Select
          icon="location-city"
          placeholder="Cidade"
          name="cidade_id"
          modalHeight={330}
          snapPoint={330}
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
          maxLength={9}
          keyboardType="number-pad"
          returnKeyType="next"
          onSubmitEditing={() => {
            formRef.current?.submitForm()
          }}
        />

        <CustomButton
          title="Próximo"
          backgroundColor={colors.buttonSecondaryBackground}
          color={colors.buttonText}
          height={50}
          fontSize={18}
          onPress={() => {
            formRef.current?.submitForm()
          }}
        />
      </Form>
    </ScrollView>
  )
}
