import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Shift } from '../types/shift';

const ItemContainer = styled(TouchableOpacity)`
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding: 12px 16px;
  flex-direction: row;
`;

const LogoImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

const ContentView = styled(View)`
  flex: 1;
`;

const CompanyText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const AddressText = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const TimeText = styled(Text)`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const PriceText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
  margin-top: 4px;
`;

const RightView = styled(View)`
  justify-content: center;
  align-items: flex-end;
`;

const RatingText = styled(Text)`
  font-size: 12px;
  color: #666;
`;

interface Props {
  shift: Shift;
  onPress: () => void;
}

export const ShiftListItem: React.FC<Props> = ({ shift, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <LogoImage source={{ uri: shift.logo }} />
      <ContentView>
        <CompanyText>{shift.companyName}</CompanyText>
        <AddressText>{shift.address}</AddressText>
        <TimeText>
          {shift.timeStartByCity} - {shift.timeEndByCity}
        </TimeText>
        <PriceText>₽{shift.priceWorker}</PriceText>
      </ContentView>
      <RightView>
        <RatingText>⭐ {shift.customerRating}</RatingText>
        <RatingText>
          {shift.currentWorkers}/{shift.planWorkers}
        </RatingText>
      </RightView>
    </ItemContainer>
  );
};