import React, { useContext, useState } from 'react'
import {
  Alert,
  Image,
  Switch,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import Loading from '../../../components/Loading'
import { useAuth } from '../../../contexts/auth'
import { useSuccessScreen } from '../../../contexts/successScreen'
import ToggleThemeContext from '../../../contexts/toogleTheme'
import api from '../../../services/api'
import { useCustomTheme } from '../../../themes/theme'
import styles from '../styles/profile'

export default function Profile() {
  const { cliente, imagem_url, requestRefreshToken, signOut } = useAuth()

  const { toggleTheme, isDarkMode } = useContext(ToggleThemeContext)

  const { colors } = useCustomTheme()

  const navigation = useNavigation()

  const {
    handleShowSuccessMessage,
    handleTitleSuccessMessage
  } = useSuccessScreen()

  const [isRequested, setIsRequested] = useState(false)

  function handleNavigateToPersonalData() {
    navigation.navigate('ChangePersonalData' as never)
  }

  function handleNavigateToAddress() {
    navigation.navigate('ChangeAddress' as never)
  }

  function handleNavigateToLoginData() {
    navigation.navigate('ChangeLoginData' as never)
  }

  async function handleDeleteClient() {
    const threeSeconds = 3000

    Alert.alert('Dletar conta', 'Tem certeza que deseja deletar a sua conta?', [
      {
        text: 'Sim',
        onPress: async () => {
          setIsRequested(true)

          await api.delete(`deletar/${cliente.id}`).then(() => {
            setIsRequested(false)

            handleTitleSuccessMessage('Conta deletada')
            handleShowSuccessMessage(true)

            setTimeout(() => {
              handleShowSuccessMessage(false)
              signOut()
            }, threeSeconds)
          }).catch(async error => {
            const apiErrorMessage = error.response.data.erro

            if (error.response.status === 401) {
              await requestRefreshToken()

              await api.delete(`deletar/${cliente.id}`).then(() => {
                setIsRequested(false)

                handleTitleSuccessMessage('Conta deletada')
                handleShowSuccessMessage(true)

                setTimeout(() => {
                  handleShowSuccessMessage(false)
                  signOut()
                }, threeSeconds)
              })
            }

            if (error.response.status === 400) {
              Alert.alert('Erro', apiErrorMessage)
            }
          })
        }
      },
      {
        text: 'Não',
        onPress: () => { setIsRequested(false) }
      }
    ])
  }

  return (
    <>
      <ScrollView>
        <View
          style={[
            styles.headerContainer,
            {
              borderBottomColor: colors.border,
              marginBottom: 50
            }
          ]}
        >
          <View style={styles.header} >
            <Image
              style={styles.image}
              source={{ uri: imagem_url.split('.com//uploads').join('/uploads') }}
            />
            <View style={styles.textContainer} >
              <Text
                style={[
                  styles.name,
                  { color: colors.text }
                ]}
              >
                {cliente?.nome.split(' ').slice(0, 2).join(' ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.label}>
          <Text
            style={[
              styles.name,
              { color: colors.text }
            ]}
          >
            Conta
          </Text>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              borderBottomColor: colors.border,
              marginTop: 20
            }
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToPersonalData}
          >
            <Feather
              name="user"
              color={colors.text}
              size={25}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                    fontSize: 17
                  }
                ]}
              >
                Dados pessoais
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: colors.primary }
                ]}
              >
                Meus dados pessoais
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={colors.border}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonContainer,
            { borderBottomColor: colors.border }
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToAddress}
          >
            <Feather
              name="map"
              color={colors.text}
              size={25}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                    fontSize: 17
                  }
                ]}
              >
                Endereço
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: colors.primary }
                ]}
              >
                Meu endereço
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={colors.border}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              borderBottomColor: colors.border,
              marginBottom: 50
            }
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToLoginData}
          >
            <Feather
              name="lock"
              color={colors.text}
              size={25}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.name,
                  {
                    color: colors.text,
                    fontSize: 17
                  }
                ]}
              >
                Login
              </Text>
              <Text
                style={[
                  styles.description,
                  { color: colors.primary }
                ]}
              >
                Meu login
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              color={colors.border}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text
            style={[
              styles.name,
              { color: colors.text }
            ]}
          >
            Configuração
          </Text>
        </View>

        <View
          style={[
            styles.buttonContainer,
            {
              borderBottomColor: colors.border,
              marginBottom: 50
            }
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={toggleTheme}
          >
            <Feather
              name={!isDarkMode ? 'moon' : 'sun'}
              color={colors.text}
              size={25}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.themeMode,
                  { color: colors.text }
                ]}
              >
                Modo escuro
              </Text>
            </View>
            <Switch
              thumbColor={colors.text}
              trackColor={{ false: '#ccc', true: '#4CAF50' }}
              value={!isDarkMode}
              onValueChange={toggleTheme}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.label}>
          <Text
            style={[
              styles.name,
              { color: colors.text }
            ]}
          >
            Segurança
          </Text>
        </View>

        <View
          style={[
            styles.buttonContainer,
            { borderBottomColor: colors.border }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.otherButton,
              {
                padding: 20,
                marginTop: 20
              }
            ]}
            onPress={handleDeleteClient}
          >
            {
              isRequested
                ? <Loading />
                : <>
                  <Feather
                    name="alert-triangle"
                    color="#C52233"
                    size={22}
                  />
                  <Text style={styles.exit}>Deletar conta</Text>
                </>
            }
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonContainer,
            { borderBottomWidth: 0 }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.otherButton,
              { padding: 20 }
            ]}
            onPress={signOut}
          >
            <Feather
              name="log-out"
              color="#C52233"
              size={22}
            />
            <Text style={styles.exit}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}
