import QueryProvider from '@/provider/QueryProvider';
import SocketProvider from '@/provider/SocketProvider';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>
          <QueryProvider>{children}</QueryProvider>
        </SocketProvider>
      </ThemeProvider>
    </>
  );
};

export default AppProvider;
