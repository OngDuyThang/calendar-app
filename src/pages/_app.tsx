import 'styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Calendar App</title>
                <meta name="title" content='Create Next App' key="title" />
                <meta name="description" content='Generated by create next app' key="description" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}