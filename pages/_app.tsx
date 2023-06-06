import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { disconnectWallet } from '../services/metamask';
import { useCookies } from 'react-cookie';
import { TOKEN_COOKIE_NAME } from '../config/auth';
import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';
import { Partytown } from '@builder.io/partytown/react';
import Head from 'next/head';
import Link from 'next/link';
import CreatedBy from '../components/CreatedBy';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    window.ethereum?.on('accountsChanged', (accounts: any) => {
      
      if (accounts?.length < 1) {
        removeCookie(TOKEN_COOKIE_NAME);
        disconnectWallet();

        if (navigate?.includes('app')) push('/');

        return;
      }
    });
  }, [])
  
  return (
    <>
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>" />
      </Head>
      <Partytown debug={true} forward={['dataLayer.push']} />
      <Script 
          strategy='worker'
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`}
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.GA_ID}', { 
                page_path: window.location.pathname,
              });
            `,
            }}
        />
      <NextNProgress color='#DB2777' height={5} />
      <CreatedBy />
      <Component {...pageProps} />
    </>
  )
}