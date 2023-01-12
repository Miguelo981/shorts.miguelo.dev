import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { disconnectWallet } from '../services/metamask';
import { useCookies } from 'react-cookie';
import { TOKEN_COOKIE_NAME } from '../config/auth';
import { usePathname, useRouter } from 'next/navigation';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    window.ethereum?.on('accountsChanged', (accounts: any) => {
      console.log(accounts)
      
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
      <NextNProgress color='#DB2777' height={5} />
      <Component {...pageProps} />
    </>
  )
}