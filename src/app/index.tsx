import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from '@/routes';
import theme from '@/theme';
import { Toast } from '@/components/toast';
export const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
