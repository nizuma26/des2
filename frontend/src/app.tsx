import './global.css';

import ThemeProvider from './theme/index';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
