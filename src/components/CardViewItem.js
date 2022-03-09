import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

export default function CardViewItem({
  card,
  handleEditCard,
  handleDeleteCard,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div>
      <Box
        key={card.id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          m: 1,
          p: 1,
        }}
      >
        <Card
          key={card.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: 220,
            height: 350,
          }}
        >
          <CardMedia
            component='img'
            height='140'
            image={card.url}
            alt={card.title}
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup='true'
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
          <Popover
            id='mouse-over-popover'
            elevation={1}
            variant='outlined'
            sx={{
              pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1, background: '#EFFFFD' }}>
              {card.url}
            </Typography>
          </Popover>
          <CardContent key={card.id}>
            <Typography gutterBottom variant='h5' component='div'>
              Id: {card.id}
            </Typography>
            <Typography variant='title' color='text.secondary'>
              {card.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              value={card.id}
              size='small'
              onClick={() => handleEditCard(card)}
            >
              Edit card
            </Button>
            <Button value={card.id} size='small' onClick={handleDeleteCard}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
