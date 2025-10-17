import React from 'react';
import { Text} from 'react-native';
import { observer } from 'mobx-react-lite';
import shiftStore from '../stores/ShiftStore';
import { CompanyName, Container, Header, Logo, PriceText, Section, SectionText, SectionTitle } from './styles';


export const ShiftDetailScreen = observer(() => {
  const shift = shiftStore.selectedShift;

  if (!shift) {
    return (
      <Container>
        <Text>Ошибка выбора смены</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Logo source={{ uri: shift.logo }} />
        <CompanyName>{shift.companyName}</CompanyName>
        <SectionText>{shift.address}</SectionText>
      </Header>

      <Section>
        <SectionTitle>Детали смены</SectionTitle>
        <SectionText>
          Дата: {shift.dateStartByCity}
        </SectionText>
        <SectionText>
          Время: {shift.timeStartByCity} - {shift.timeEndByCity}
        </SectionText>
        <SectionText>Тип: {shift.workTypes.map((wt) => wt.name).join(', ')}</SectionText>
      </Section>

      <Section>
        <SectionTitle>Работники</SectionTitle>
        <SectionText>
          Требуется: {shift.planWorkers}
        </SectionText>
        <SectionText>
          Уже набрано: {shift.currentWorkers}
        </SectionText>
      </Section>

      <Section>
        <SectionTitle>Оплата</SectionTitle>
        <PriceText>₽{shift.priceWorker}</PriceText>
      </Section>

      <Section>
        <SectionTitle>Рейтинг компании</SectionTitle>
        <SectionText>
          Рейтинг: {shift.customerRating} / 5
        </SectionText>
        <SectionText>
          Отзывы: {shift.customerFeedbacksCount}
        </SectionText>
      </Section>
    </Container>
  );
});