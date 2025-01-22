import QueryProvider from '@/provider/QueryProvider';
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
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <QueryProvider>{children}</QueryProvider>
            </ThemeProvider>
        </>
    );
};

export default AppProvider;
