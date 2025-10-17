import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components/native';
import shiftStore from '../stores/ShiftStore';
import { requestLocationPermission, getCurrentLocation } from '../utils/geolocation';
import { Shift } from '../types/shift';
import { ShiftListItem } from 'src/components/ShiftListItem';

const Container = styled(View)`
  flex: 1;
  background-color: #f5f5f5;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled(Text)`
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
    navigation.navigate('ShiftDetail');
  };

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
        renderItem={({ item }) => (
          <ShiftListItem
            shift={item}
            onPress={() => handleSelectShift(item)}
          />
        )}
      />
    </Container>
  );
});