import ExchangeRate from './components/ExchangeRate.tsx'
import WalletContainer from './views/WalletContainer.tsx'
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable automatic refetching on focus
      refetchInterval: 60000, // Refetch queries every 60 seconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ExchangeRate /> */}
      <WalletContainer />
    </QueryClientProvider>
  );
}

export default App;
