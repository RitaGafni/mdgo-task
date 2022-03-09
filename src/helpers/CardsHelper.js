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

export const getCardIndex = (cardsData, id) => {
  let temp = cardsData;
  return temp.findIndex((obj) => obj.id === id);
};

export const getMaxId = (cardsData) => {
  let allIds = [];
  cardsData.forEach((card) => allIds.push(card.id));
  return Math.max(...allIds);
};

export const checkIfTitleExists = (cardsData, title, id) => {
  return cardsData.filter((card) => card.title === title && card.id !== id)
    .length;
};

export const checkIfUrlExists = (cardsData, url, id) => {
  return cardsData.filter((card) => card.url === url && card.id !== id).length;
};
