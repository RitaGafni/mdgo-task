import { fetchDataFromAPI } from '../services/CardsServices';
import validator from 'validator';

export const fetchCardsData = async (numberOfCards) => {
  const data = await fetchDataFromAPI();
  return data;
};

export const deleteCard = (cardsData, cardID) => {
  return cardsData.filter((item) => item.id !== cardID);
};

export const validateURL = (value) => {
  if (
    validator.isURL(value, {
      protocols: ['http', 'https'],
      require_protocol: true,
    })
  ) {
    return true;
  } else {
    return false;
  }
};
