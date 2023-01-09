"use client";

import { useEffect, useState } from "react";
import {
  checkMetamaskConnection,
  connectToMetamask,
  getWalletAddress,
  web3,
} from "../services/metamask";
import { getSimplifiedAddress } from "../utils/text";
import Web3Token from 'web3-token';
import { useCookies } from "react-cookie";
import { TOKEN_COOKIE_NAME } from "../config/auth";
import { useRouter, usePathname } from "next/navigation";
import LoadingSM from "./LoadingSM";
import { createUser, getMyUser } from "../services/short-api";

type GetStartedBtnProps = {
  text?: string;
  className?: string;
}

export default function GetStartedBtn({ text='Connect', className="app-cta-btn app-btn bg-gray-900 hover:bg-gray-800" }: GetStartedBtnProps) {
  console.log(className)
  const { push } = useRouter();
  const navigate = usePathname();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    console.log(navigate);
    (async () => {
      await checkMetamaskConnection();
      setBtnDisabled(false);
      setAddress(await getWalletAddress());
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
    if (!address) return;

    const token = await Web3Token.sign((msg: any) => web3.eth.personal.sign(msg, address, ""), '1d');
    setCookie(TOKEN_COOKIE_NAME, token);

    return token;
  }

  const connect = async () => {
    let personalAddress = await getWalletAddress();

    if (!personalAddress) {
      await connectToMetamask();

      personalAddress = await getWalletAddress();
      setAddress(personalAddress);
    }

    setLoading(true);

    const token = await handleRefreshToken();
    const res = await handleCreateUser(token)

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
            <span className="flex items-center gap-2"><LoadingSM /> { text }</span> 
          : address ? 
            getSimplifiedAddress(address) : text }
        </span>
      </button>
    </div>
  );
}
