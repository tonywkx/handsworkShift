import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  padding: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const CompanyName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
  text-align: center;
`;

export const Section = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

export const SectionText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const PriceText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
`;

export const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const EmptyStateText = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
`;

export const Separator = styled.View<{ vertical?: boolean }>`
  width: ${({ vertical }) => (vertical ? '1px' : '100%')};
  height: ${({ vertical }) => (vertical ? '100%' : '1px')};
  margin-vertical: 8px;
  background-color:rgb(170, 158, 158);
`