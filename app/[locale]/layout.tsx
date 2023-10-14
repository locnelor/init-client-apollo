import { ApolloWrapper } from '@/lib/apollo-provider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { __DEV__ } from '@apollo/client/utilities/globals';
import { LayoutProps } from '@/types/LayoutProps';
import Providers from '@/styles/Providers';
import { Theme } from '@radix-ui/themes';
import Header from './Header';

if (__DEV__) {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}

export default async function LocaleLayout({
    children,
    params: { locale }
}: LayoutProps) {
    const messages = await getMessages(locale)

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Theme>
                        <Providers>
                            <ApolloWrapper>
                                <Header />
                                {children}
                            </ApolloWrapper>
                        </Providers>
                    </Theme>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}