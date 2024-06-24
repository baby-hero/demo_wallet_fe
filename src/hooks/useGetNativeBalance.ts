import { useQuery } from 'react-query';
import { getBalance } from '../services/nativeBalanceService'; // Assuming getBalance is defined in api.js or similar

const useBalanceQuery = (selectedAddress:string) => {
  return useQuery({
    queryKey: ['getBalance', selectedAddress],
    queryFn: () => getBalance(selectedAddress),
    staleTime: 1000 * 300, // 5 minutes
    retry: 1,
    retryDelay: 6000, // 6 seconds
    enabled: !!selectedAddress, // Only run if selectedAddress is truthy
  });
};

export default useBalanceQuery;
