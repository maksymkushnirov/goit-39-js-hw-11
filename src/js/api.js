import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '24403599-f84531e333bd81f07832587e9';

export async function fetchImages(query) {
  const response = await axios.get(
    `${BASE_URL}/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`,
  );
  return response;
}
