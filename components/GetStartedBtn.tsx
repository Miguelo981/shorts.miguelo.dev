;

import { useEffect, useState } from "react";
import {
  checkMetamaskConnection,
  connectToMetamask,
  getWalletAddress,
  verifyToken,
  web3,
} from "../services/metamask";
import Web3Token from 'web3-token';
import { useCookies } from "react-cookie";
import { TOKEN_COOKIE_NAME } from "../config/auth";
import { useRouter, usePathname } from "next/navigation";
import LoadingSM from "./LoadingSM";
import { createUser, getMyUser } from "../services/short-api";
import { toast } from 'react-hot-toast';

type GetStartedBtnProps = {
  text?: string;
  className?: string;
}

export default function GetStartedBtn({ text='Connect', className="app-cta-btn app-btn bg-gray-900 hover:bg-gray-800" }: GetStartedBtnProps) {
  const { push } = useRouter();
  const navigate = usePathname();
  const [isWalletConnected, setWalletConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    (async () => {
      await checkMetamaskConnection();
      setBtnDisabled(false);
      setWalletConnected((await getWalletAddress()) ? true : false);
    })();
  }, []);

  const handleCreateUser = async (token?: string): Promise<boolean> => {
    try {
      await getMyUser(token || cookie[TOKEN_COOKIE_NAME])

      return true;
    } catch(err) {
      return await createUser(token || cookie[TOKEN_COOKIE_NAME])
        .then(() => { return true })
        .catch(() => { return false })
    }
  }

  const handleRefreshToken = async (): Promise<string | undefined> => {
    const walletAddress = await getWalletAddress();

    if (!walletAddress) return;

    const token = await Web3Token.sign((msg: any) => web3?.eth.personal.sign(msg, walletAddress, ""), '1d');
    setCookie(TOKEN_COOKIE_NAME, token);

    return token;
  }

  const connect = async () => {
    const personalAddress = await getWalletAddress();

    if (!personalAddress) {
      await toast.promise(
          connectToMetamask(), 
          {
              loading: 'Connecting to Metamask...',
              success: <b>Successfully connected to Metamask!</b>,
              error: <b>Failed to connect to Metamask!</b>,
          },
          {
            position: 'bottom-center'
          }
      );
    }

    setLoading(true);
    const { status } = await verifyToken(cookie[TOKEN_COOKIE_NAME] || '')

    const token = status ? cookie[TOKEN_COOKIE_NAME] : await handleRefreshToken();
    const res = await handleCreateUser(token);

    if (res && !navigate?.includes('app')) {
      push('/app')
      setLoading(false);
      return;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={connect}
        className={className}
        disabled={btnDisabled}
      >
        <span className="text-xl">{ 
          loading ? 
            <span className="flex justify-center items-center gap-2"><LoadingSM /> { text }</span> 
          : isWalletConnected ? 
            //getSimplifiedAddress(address) : text }
            text : 'Connect Wallet' }
        </span>
      </button>
    </div>
  );
}
