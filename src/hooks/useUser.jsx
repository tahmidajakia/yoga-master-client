import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic'; // Import useAxiosPublic

const useUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic(); // Use axiosPublic

  const { data: currentUser, isLoading, refetch } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      if (!user?.email) return null; // Ensure user email is available
      const res = await axiosPublic.get(`/user/${user.email}`); // Use axiosPublic here
      return res.data;
    },
    enabled: !!user?.email, // Ensure the query runs only if the email exists
  });

  return { currentUser, isLoading, refetch };
};

export default useUser;
