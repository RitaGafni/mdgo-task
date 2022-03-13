import React from 'react';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import configData from '../config.json';

export default function CardsPagination({
  numberOfPages,
  handlePageChange,
  cardsPerPage,
  setCardsPerPage,
}) {
  const pagesOptions = configData.PAGE_OPTIONS;

  const handleChange = (event) => {
    setCardsPerPage(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      <Box sx={{ width: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='select-cards-per-page'>cards per page</InputLabel>
          <Select
            id='select'
            value={cardsPerPage}
            label='Cards per page'
            onChange={handleChange}
          >
            {pagesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Pagination
          showFirstButton
          showLastButton
          color='primary'
          count={numberOfPages}
          sx={{ justifyContent: 'center', display: 'flex' }}
          onChange={(e, pageNumber) => handlePageChange(pageNumber)}
        />
      </Box>
    </Box>
  );
}
