import React, { memo, useState } from 'react';

import api from '../../services/api';

import { Alert, Text, View } from 'react-native';

import styles from './styles';

import { AxiosError } from 'axios';

import { useNavigation, useTheme } from '@react-navigation/native';

import { MaterialIcons as Icon } from '@expo/vector-icons';

import CustomButton from '../../components/Button';

interface CardAppointmentsProps {
  text: string;
  agendamento_id: number;
  id: number;
};

function CardAppointments({text, agendamento_id, id}: CardAppointmentsProps) {
  const [loading, setLoading] = useState(false);

  const {colors} = useTheme();

  const navigation = useNavigation();

  function handleNavigateToDetail() {
    navigation.navigate('Detail', {agendamento_id});
  };

  function handleNavigateToReschedule() {
    navigation.navigate('Reschedule', {id});
  };

  function handleNavigateToChangeProcedure() {
    navigation.navigate('ChangeProcedure', {agendamento_id});
  };

  async function handleDeleteSchedule() {
    const threeSeconds = 3000;

    await api.delete(`cancelar/${id}`).then(() => {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Appointments'}]
        });
      }, threeSeconds);
    }).catch((error: AxiosError) => {
      const apiErrorMessage = error.response?.data.erro;
      Alert.alert('Erro', apiErrorMessage);
    });
  };

  return (
    <View 
      style={[
        styles.card,
        {backgroundColor: colors.card}
      ]}
    >
      <View style={styles.header}>
        <Icon name="event-available" size={20} color={colors.text}/>
        <Text 
          style={[
            styles.text,
            {color: colors.text}
          ]}
        >
          {text}
        </Text>
      </View>
      <CustomButton 
        title="VER DETALHES" 
        backgroundColor={colors.buttonSecondaryBackground} 
        color={colors.buttonText}
        height={50}
        fontSize={15}
        onPress={handleNavigateToDetail}
      />
      <CustomButton 
        title="REMARCAR" 
        backgroundColor={colors.buttonSecondaryBackground} 
        color={colors.buttonText}
        height={50}
        fontSize={15}
        onPress={handleNavigateToReschedule}
      />
      <CustomButton 
        title="ALTERAR PROCEDIMENTO" 
        backgroundColor={colors.buttonSecondaryBackground} 
        color={colors.buttonText}
        height={50}
        fontSize={15}
        onPress={handleNavigateToChangeProcedure}
      />
      <CustomButton 
        title="CANCELAR" 
        backgroundColor={colors.buttonTertiaryBackground} 
        color={colors.buttonText}
        height={50}
        fontSize={15}
        // loading={loading}
        onPress={() => {
          setLoading(true);
          handleDeleteSchedule();
        }}
      />
    </View>
  );
};

export default memo(CardAppointments);