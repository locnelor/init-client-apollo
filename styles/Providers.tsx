'use client';

import { ThemeProvider } from 'styled-components';
import theme from './theme';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from './GlobalStyles';

const Providers = (props: React.PropsWithChildren) => {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                {props.children}
            </ThemeProvider>
        </StyledComponentsRegistry>
    );
};

export default Providers