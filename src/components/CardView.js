import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { deleteCard } from '../helpers/CardsHelper';
import CardsPagination from './CardsPagination';
import CardViewItem from './CardViewItem';
import configData from '../config.json';

export default function CardView({
  cardsData,
  setCardsData,
  handleOpenWizard,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(
    configData.DEFAULD_CARDS_PER_PAGE
  );
  const [currentCards, setCurrentCards] = useState();
  const [numberOfPages, setNumberOfPages] = useState();

  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const cards = cardsData
      ? cardsData.slice(indexOfFirstCard, indexOfLastCard)
      : null;
    setCurrentCards(cards);
    const numberOfCards = cardsData ? cardsData.length : null;
    setNumberOfPages(Math.ceil(numberOfCards / cardsPerPage));
  }, [cardsData, cardsPerPage, currentPage, handleOpenWizard]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (numberOfPages < currentPage && numberOfPages) {
    setCurrentPage(numberOfPages);
  }

  const handleDeleteCard = (e) => {
    const filteredCards = deleteCard(cardsData, parseInt(e.target.value));
    setCardsData(filteredCards);
  };

  const handleEditCard = (cardToEdit) => {
    handleOpenWizard(true, true, cardToEdit);
  };

  return (
    <Box sx={{ alignItems: 'center', m: 1 }}>
      <CardsPagination
        numberOfPages={numberOfPages}
        handlePageChange={handlePageChange}
        cardsPerPage={cardsPerPage}
        setCardsPerPage={setCardsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          m: 1,
          p: 1,
          flexWrap: 'wrap',
        }}
      >
        {currentCards &&
          currentCards.map((item) => (
            <CardViewItem
              card={item}
              handleEditCard={handleEditCard}
              handleDeleteCard={handleDeleteCard}
            />
          ))}
      </Box>
    </Box>
  );
}
