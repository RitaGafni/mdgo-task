const API_ADDRESS = 'https://jsonplaceholder.typicode.com/photos';

export const fetchDataFromAPI = async () => {
  return await fetch(API_ADDRESS)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error('coulnd get data');
      }
    })
    .then((data) => data);
};
