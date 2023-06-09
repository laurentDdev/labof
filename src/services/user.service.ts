import axios from 'axios';
import {API_URL} from '@env';

const apiUrl = API_URL;

const userService = {
  getProfile: async token => {
    try {
      const data = await axios.get(`${apiUrl}/user/my-profile`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

export default userService;
