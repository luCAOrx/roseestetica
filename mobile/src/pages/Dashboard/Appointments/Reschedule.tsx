import React, { useEffect, useRef, useState } from 'react'
import { Alert, RefreshControl, ScrollView } from 'react-native'
import { DateData } from 'react-native-calendars'

import { useNavigation, useRoute } from '@react-navigation/native'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'
import * as Yup from 'yup'

import CustomButton from '../../../components/Button'
import { SelectDate, SelectHour } from '../../../components/Form'
import Header from '../../../components/Header'
import Loading from '../../../components/Loading'
import { useAuth } from '../../../contexts/auth'
import { useSuccessScreen } from '../../../contexts/successScreen'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import getValidationErros from '../../../utils/handleErrors'

interface ReScheduleData {
  data: string
  horario_id: number
}

interface AvailableAppointments {
  id: number
  data: string
  horario: string
  situacao: string
}

interface ScheduleParams {
  id: number
}

export default function Schedule() {
  const { cliente, requestRefreshToken } = useAuth()

  const route = useRoute()
  const params = route.params as ScheduleParams

  const { colors } = useCustomTheme()

  const [
    availableAppointments,
    setAvailableAppointments
  ] = useState<AvailableAppointments[]>([])

  const [selectedDay, setSelectedDay] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRequested, setIsRequested] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const navigation = useNavigation()

  const {
    handleShowSuccessMessage,
    handleTitleSuccessMessage
  } = useSuccessScreen()

  const situation = availableAppointments.map(schedule => schedule.situacao)

  const availableHour = availableAppointments.map(schedule => schedule.horario)

  useEffect(() => {
    async function loadAvailablesSchedules() {
      api.get('agendamentos_disponiveis', {
        params: {
          data: selectedDay
        }
      }).then(response => {
        setAvailableAppointments(response.data)
      }).catch(async error => {
        if (error.response.status === 401) {
          await requestRefreshToken()

          await loadAvailablesSchedules()
        }
      })
    }

    setIsLoading(true)
    loadAvailablesSchedules()
    setIsLoading(false)
  }, [selectedDay])

  const onDayPress = (day: DateData) => {
    setSelectedDay(day.dateString)
  }

  function handleNavigateToAppointments() {
    navigation.navigate('Appointments' as never)
  }

  async function handleSubmit(scheduleData: ReScheduleData) {
    const { data, horario_id } = scheduleData

    const dataFinal = { data, horario_id: Number(horario_id) }

    const threeSeconds = 3000

    try {
      const schema = Yup.object().shape({
        data: Yup.string().required('Você precisa selecionar um dia!'),
        horario_id: Yup.number().min(1, 'Você precisa selecionar um horário!')
      })

      await schema.validate(dataFinal, {
        abortEarly: false
      })

      formRef.current?.setErrors({})

      setIsRequested(true)

      await api.put(`remarcar/${params.id}/${cliente?.id}`, dataFinal).then(() => {
        setIsRequested(false)
        handleTitleSuccessMessage('Remarcado com sucesso')
        handleShowSuccessMessage(true)

        setTimeout(() => {
          handleShowSuccessMessage(false)

          navigation.reset({
            index: 0,
            routes: [{ name: 'Appointments' as never }]
          })

          handleNavigateToAppointments()
        }, threeSeconds)
      }).catch(async error => {
        const apiErrorMessage = error.response.data.mensagem

        if (error.response.status === 401) {
          await requestRefreshToken()
          formRef.current?.submitForm()
        }

        if (error.response.status === 400) {
          setIsRequested(false)

          Alert.alert('Falha ao remarcar agendamento', apiErrorMessage)
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

  function refreshAvailablesSchedules() {
    setRefreshing(true)

    navigation.reset({
      index: 0,
      routes: [{ name: 'Reschedule' as never }]
    })

    setRefreshing(false)
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshAvailablesSchedules}
          />
        }
      >
        <Header title="Remarcar agendamento" showIcon fontSize={25} />
        <Form
          ref={formRef}
          style={{ flexGrow: 1 }}
          onSubmit={handleSubmit}
        >
          <SelectDate name="data" selectedDay={selectedDay} onDayPress={onDayPress} />

          {selectedDay
            ? <>
              <Header title="Selecione o horário" showIcon={false} fontSize={26} />
              {isLoading
                ? <Loading />
                : <SelectHour
                  name="horario_id"
                  available={situation}
                  availableTime={availableHour}
                  selectedDay={selectedDay}
                />
              }
            </>
            : null
          }

          <CustomButton
            title="REMARCAR"
            backgroundColor={colors.buttonPrimaryBackground}
            color={colors.buttonText}
            height={50}
            fontSize={15}
            isRequested={isRequested}
            onPress={() => {
              formRef.current?.submitForm()
            }}
          />
        </Form>
      </ScrollView>
    </>
  )
}
