import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { validateURL } from '../helpers/CardsHelper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardWizard({
  isWizardOpen,
  editMode,
  cardToEdit,
  setIsWizardOpen,
  setEditMode,
  handleEditCard,
}) {
  const [currentCard, setCurrentCard] = useState({
    id: '',
    title: '',
    url: '',
  });
  const [titleVerification, setTitleVerification] = useState('');
  const [urlVerification, setUrlVerification] = useState('');

  useEffect(() => {
    if (cardToEdit) {
      setCurrentCard({
        id: cardToEdit.id,
        title: cardToEdit.title,
        url: cardToEdit.url,
      });
    }
  }, [cardToEdit]);

  useEffect(() => {
    setOpen(isWizardOpen);
  }, [isWizardOpen]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setIsWizardOpen(false);
    setEditMode(false);
  };

  const handleEditCardFields = (e) => {
    if (e.target.name === 'title') {
      setTitleVerification('');
    } else if (e.target.name === 'url') {
      setUrlVerification('');
    }
    setCurrentCard((prevStata) => {
      return { ...prevStata, [e.target.name]: e.target.value };
    });
  };

  const handleSaveChanges = () => {
    if (currentCard.title === '') {
      setTitleVerification('Title cannot be empty');
      return;
    }
    if (!validateURL(currentCard.url)) {
      setUrlVerification('URL is not valid');
      return;
    }
    if (editMode) {
      handleEditCard(currentCard);
      setIsWizardOpen(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {editMode ? 'Edit Photo' : 'Add New Photo'}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              m: 1,
            }}
          >
            <TextField
              required
              id='card-title'
              name='title'
              label='Card title'
              fullWidth
              variant='standard'
              value={currentCard.title}
              multiline
              onChange={handleEditCardFields}
              error={titleVerification !== ''}
              helperText={titleVerification}
              sx={{ m: 2 }}
            />
            <TextField
              required
              id='card-url'
              name='url'
              label='Card url'
              fullWidth
              variant='standard'
              value={currentCard.url}
              onChange={handleEditCardFields}
              error={urlVerification !== ''}
              helperText={urlVerification}
            />
            <Button sx={{ mt: 2 }} onClick={handleSaveChanges}>
              Save Changes
            </Button>{' '}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
