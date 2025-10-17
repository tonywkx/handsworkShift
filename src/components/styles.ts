import styled from 'styled-components/native';

export const ItemContainer = styled.TouchableOpacity`
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  padding: 12px 16px;
  flex-direction: row;
  
`;

export const LogoImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
`;

export const ContentView = styled.View`
  flex: 1;
`;

export const CompanyText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

export const AddressText = styled.Text`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const TimeText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

export const PriceText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #4caf50;
  margin-top: 4px;
`;

export const RightView = styled.View`
  justify-content: center;
  align-items: flex-end;
`;

export const RatingText = styled.Text`
  font-size: 12px;
  color: #666;
`;