import React, { useEffect, useState } from 'react'

import api from '../../../services/api';

import { FlatList, Text, ScrollView, RefreshControl } from 'react-native';

import styles from '../styles/appointments';

import CardAppointments from '../../../components/CardAppointments';
import Loading from '../../../components/Loading';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useAuth } from '../../../contexts/auth';

import { useTheme } from '@react-navigation/native';

interface MySchedules {
  id: number;
  data: string;
  horario: string;
};

export default function Appointments() {
  const {cliente} = useAuth();

  const {colors} = useTheme();

  const [mySchedules, setMySchedules] = useState<MySchedules[]>([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadSchedules(pageNumber = page, shouldRefresh = false) {
    if (loading) return;

    if (totalPage && pageNumber > totalPage) return;
    
    setLoading(true);
    
    await api.get(`meus_agendamentos/${cliente?.id}`, {params: {
      page: pageNumber
    }}).then(response => {
      const totalSchedules = response.headers['x-total-count'];

      setMySchedules(shouldRefresh ? response.data : [...mySchedules, ...response.data]);
      setTotalPage(Math.ceil(totalSchedules / 5));
      setPage(pageNumber + 1);
      setLoading(false);
    }).catch(err => console.log(err.response.data.erro));
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  async function refreshList() {
    setRefreshing(true);

    await loadSchedules(1, true);

    setRefreshing(false);
  };

  return (
    <>
      {!mySchedules.length ? (
        <ScrollView
         contentContainerStyle={{flex:1, justifyContent: 'center'}}
         refreshControl={
            <RefreshControl 
              progressBackgroundColor={colors.background}
              colors={[colors.text]}
              refreshing={refreshing}
              onRefresh={refreshList}
            />
          }
        >
          <Text style={styles.text}>Sem agendamento(s)</Text>
        </ScrollView>
      ) : (
        <FlatList 
          data={mySchedules}
          keyExtractor={schedule => String(schedule.id)}
          disableVirtualization={false}
          onEndReached={() => loadSchedules()}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl 
              progressBackgroundColor={colors.card}
              colors={[colors.text]}
              refreshing={refreshing}
              onRefresh={refreshList}
            />
          }
          ListFooterComponent={loading ? <Loading /> : null}
          renderItem={({ item: schedule }) => (
            <CardAppointments 
              text={`${
                format(parseISO(schedule.data), "eeeeee dd 'de' MMM 'de' yyyy" , {
                  locale: ptBR
                })} ás ${schedule.horario}h`
              }
              agendamento_id={schedule.id}
              id={schedule.id}
            />
          )}
        />
      )}
    </>
  );
};