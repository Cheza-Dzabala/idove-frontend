import axios from 'axios';

export default axios.create({
  baseURL: 'http://idove-backend.test',
  headers: {
    'Accept': 'application/json'
  }
});

