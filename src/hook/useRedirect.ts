import { useNavigate } from 'react-router';
import { useGymStore } from '../store/GymStore';

const useRedirect = (redirectTo) => {
  const navigate = useNavigate();
  const {} = useGymStore()
  
};

export default useRedirect;
