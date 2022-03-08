import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { deleteCard } from '../helpers/CardsHelper';
import CardsPagination from './CardsPagination';
import CardViewItem from './CardViewItem';

export default function CardView({
  cardsData,
  setCardsData,
  handleOpenWizard,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(20);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = cardsData
    ? cardsData.slice(indexOfFirstCard, indexOfLastCard)
    : null;
  const numberOfCards = cardsData ? cardsData.length : null;
  const numberOfPages = parseInt(numberOfCards / cardsPerPage);

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
        {cardsData &&
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
