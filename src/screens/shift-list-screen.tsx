import React, { useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import shiftStore from '../stores/ShiftStore';
import { requestLocationPermission, getCurrentLocation } from '../utils/geolocation';
import { Shift } from '../types/shift';
import styled from 'styled-components/native';
import { ShiftListItem } from 'src/components/shift-list-item';
import { APP_ROUTES } from 'src/utils';
import { EmptyStateContainer, EmptyStateText, Separator } from './styles';


const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  margin-horizontal: 16px;
  margin-top: 8px;
  margin-bottom: 32px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: red;
  text-align: center;
  padding: 20px;
  font-size: 14px;
`;

export const ShiftListScreen = observer(({ navigation }: any) => {
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          shiftStore.error = 'Location permission denied';
          return;
        }

        const location = await getCurrentLocation();
        shiftStore.setUserLocation(location);
        await shiftStore.fetchShifts(location);
      } catch (err) {
        shiftStore.error = 'Failed to get location';
      }
    };

    initializeLocation();
  }, []);

  const handleSelectShift = (shift: Shift) => {
    shiftStore.selectShift(shift);
    navigation.navigate(APP_ROUTES.SHIFT_DETAILS);
  };

  const renderItem = useCallback(
    ({ item }: { item: Shift }) => (
      <ShiftListItem
        shift={item}
        onPress={() => handleSelectShift(item)}
      />
    ),
    [handleSelectShift]
  );

   const renderEmptyList = () => (
  <EmptyStateContainer>
    <EmptyStateText>Рядом с вами доступные смены не найдены</EmptyStateText>
  </EmptyStateContainer>
  );

  if (shiftStore.loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      {shiftStore.error && <ErrorText>{shiftStore.error}</ErrorText>}
      <FlatList
        data={shiftStore.shifts}
        keyExtractor={(item, index) => item.id.toString() ?? index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        ItemSeparatorComponent={Separator}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        scrollEventThrottle={16}
      />
    </Container>
  );
});