// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';

// import { useQuery } from '@tanstack/react-query';
// const useRole = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user, loading } = useAuth();
//   const { data: role, isLoading } = useQuery({
//     queryKey: ['role', user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/users/role/${user?.email}`);
//       return data;
//     },
//   });
//   return [role, isLoading];
// };

// export default useRole;

import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User email is not available');
      }
      const { data } = await axiosSecure(`/users/role/${user?.email}`);
      return data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
