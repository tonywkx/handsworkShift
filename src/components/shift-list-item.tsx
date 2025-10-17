import React from 'react';
import { Shift } from '../types/shift';
import { AddressText, CompanyText, ContentView, ItemContainer, LogoImage, PriceText, RatingText, RightView, TimeText } from './styles';

interface Props {
  shift: Shift;
  onPress: () => void;
}

export const ShiftListItem = ({ shift, onPress }: Props) => {
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