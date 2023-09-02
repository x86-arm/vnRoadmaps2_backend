"use client";

// @ts-ignore
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { store } from "redux/store";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
interface Props extends ThemeProviderProps {
  children?: React.ReactNode;
}

export default function Providers({ children }: Props) {
  const queryClient = new QueryClient()

  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
}
