import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { fetchCardsData, getCardIndex, getMaxId } from '../helpers/CardsHelper';
import CardView from '../components/CardView';
import NavBar from '../components/NavBar';
import CardWizard from '../components/CardWizard';

export default function HomePage() {
  const [cardsData, setCardsData] = useState();
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardToEdit, setCardToEdit] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllCards = async () => {
      setLoading(true);
      const data = await fetchCardsData();
      setCardsData(data);
      setLoading(false);
    };
    fetchAllCards();
  }, []);

  const handleOpenWizard = (editMode, wizardState, cardToEdit) => {
    setEditMode(editMode);
    setCardToEdit(cardToEdit);
    setIsWizardOpen(wizardState);
  };

  const handleEditCard = (cardToEdit) => {
    const cardIndex = getCardIndex(cardsData, cardToEdit.id);
    let temp = cardsData;
    temp[cardIndex] = cardToEdit;
    setCardsData(temp);
  };

  const handleNewCard = (cardToAdd) => {
    const maxId = getMaxId(cardsData);
    const temp = [
      ...cardsData,
      {
        id: maxId + 1,
        title: cardToAdd.title,
        url: cardToAdd.url,
      },
    ];
    setCardsData(temp);
  };

  return (
    <div>
      <NavBar handleOpenWizard={handleOpenWizard} />
      <Box>
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 5,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CardView
            cardsData={cardsData}
            setCardsData={setCardsData}
            handleOpenWizard={handleOpenWizard}
          />
        </Box>
        <CardWizard
          isWizardOpen={isWizardOpen}
          editMode={editMode}
          cardToEdit={cardToEdit}
          setIsWizardOpen={setIsWizardOpen}
          setEditMode={setEditMode}
          handleEditCard={handleEditCard}
          handleNewCard={handleNewCard}
          cardsData={cardsData}
        />
      </Box>
    </div>
  );
}
