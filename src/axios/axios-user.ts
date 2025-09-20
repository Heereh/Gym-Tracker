import axios from 'axios';

export const createUser = async () => {
  try {
    const response = await axios.post(`${process.env.}api/v1/auth/register`)
    
  } catch (error) {
    
  }

};
