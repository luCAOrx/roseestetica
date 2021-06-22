import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/core';

import { Alert, Text, View } from 'react-native';

import styles from '../styles/details';

import { ScrollView } from 'react-native-gesture-handler';

import { useAuth } from '../../../contexts/auth';

import api from '../../../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Loading from '../../../components/Loading';

import { useTheme } from '@react-navigation/native';

interface Data {
  agendamento: {
    data: string;
    horario: string;
    agendado_em: string;
    remarcado_em: string;
  };

  procedimentos: {
    id: number;
    procedimento: string;
    preco: string;
    procedimento_alterado_em: string;
  }[];
};

interface ScheduleParams {
  agendamento_id: number;
};

export default function Detail() {
  const route = useRoute();
  const params = route.params as ScheduleParams;

  const {cliente} = useAuth();

  const {colors} = useTheme();

  const [detail, setDetail] = useState<Data>({} as Data);
  
  useEffect(() => {
    api.get(`detalhes_do_agendamento/${cliente?.id}/${params.agendamento_id}`)
    .then(response => {
      setDetail(response.data);
    }).catch(err => Alert.alert(err.response.data.erro));
  }, []);

  if (!detail.agendamento) {
    return <Loading />
  };

  return (
    <ScrollView>
      <View style={styles.card}>
        <View 
          style={[
            styles.header,
            {backgroundColor: colors.detailHeaderBackground}
          ]}
        >
          <Text 
            style={[
              styles.text,
              {color: colors.buttonText}
            ]}
          >
            Data e hora
          </Text>
        </View>  
        <View style={styles.detail}>
          <Text 
            style={[
              styles.text,
              {color: colors.text}
            ]}
          >
            {`${format(parseISO(detail.agendamento.data), 
                "eeeeee dd 'de' MMM 'de' yyyy" , {
                locale: ptBR
              })} às ${detail.agendamento.horario}h`
            }
          </Text>
        </View>

        <View 
          style={[
            styles.header,
            {backgroundColor: colors.detailHeaderBackground}
          ]}
        >
          <Text 
            style={[
              styles.text,
              {color: colors.buttonText}
            ]}
          >
            Procedimento e preço
          </Text>
        </View>  
        {detail.procedimentos.map(procedure => (
          <View key={procedure.id} style={styles.detailChild}>
            <Text 
              style={[
                styles.text,
                {color: colors.text}
              ]}
            >
              {procedure.procedimento}
            </Text>
            <Text 
              style={[
                styles.price,
                {color: colors.price}
              ]}
            >
              {procedure.preco}
            </Text>
          </View>
        ))}

        <View 
          style={[
            styles.header,
            {backgroundColor: colors.detailHeaderBackground}
          ]}
        >
          <Text 
            style={[
              styles.text,
              {color: colors.buttonText}
            ]}
          >
            Data do agendamento
          </Text>
        </View>  
        <View style={styles.detail}>
          <Text 
            style={[
              styles.text,
              {color: colors.text}
            ]}
          >
            {`${format(parseISO(detail.agendamento.agendado_em), 
                "eeeeee dd 'de' MMM 'de' yyyy 'às' HH:mm" , {
                locale: ptBR
              })}`
            }
          </Text>
        </View>

        <View 
          style={[
            styles.header,
            {backgroundColor: colors.detailHeaderBackground}
          ]}
        >
          <Text 
            style={[
              styles.text,
              {color: colors.buttonText}
            ]}
          >
            Data do remarque
          </Text>
        </View>  
        <View style={styles.detail}>
          <Text 
            style={[
              !detail.agendamento.remarcado_em ? 
              [styles.text, {color: colors.primary}] : styles.text
            ]}
          >
            {detail.agendamento.remarcado_em === null ? 'Ainda não houve um remarque' : 
              `${format(parseISO(detail.agendamento.remarcado_em), 
                  "eeeeee dd 'de' MMM 'de' yyyy 'às' HH:mm" , {
                  locale: ptBR
                })
              }`
            }
          </Text>
        </View>

        <View 
          style={[
            styles.header,
            {backgroundColor: colors.detailHeaderBackground}
          ]}
        >
          <Text 
            style={[
              styles.text,
              {color: colors.buttonText}
            ]}
          >
            Data da alteração do procedimento
          </Text>
        </View>  
        {detail.procedimentos.map(procedure => (
          <View key={procedure.id} style={styles.detail}>
            <Text 
              style={[
                !procedure.procedimento_alterado_em ? 
                [styles.text, {color: colors.primary}] : styles.text
              ]}
            >
              {procedure.procedimento_alterado_em === null ? 
                'Ainda não houve alteração do procedimento' : 
                `${format(parseISO(procedure.procedimento_alterado_em), 
                  "eeeeee dd 'de' MMM 'de' yyyy 'às' HH:mm" , {
                  locale: ptBR
                })}`  
              }
            </Text>
          </View>
        ))[0]}
      </View>
    </ScrollView>
  );
};