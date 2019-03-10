import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-fab61.firebaseio.com'
});

export default instance;
