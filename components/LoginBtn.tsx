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

type LoginBtnProps = {
  text?: string;
  className?: string;
}

export default function LoginBtn({ text='Connect', className="app-cta-btn app-btn bg-gray-900 hover:bg-gray-800" }: LoginBtnProps) {
  const { push } = useRouter();
  const navigate = usePathname();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    console.log(navigate);
    (async () => {
      await checkMetamaskConnection();
      setAddress(await getWalletAddress());
    })();
  }, []);

  const createUser = async (token?: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_API_V}/user/register`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || cookie[TOKEN_COOKIE_NAME]}`
        }
    })
    .then(res => res.json())
}

  const connect = async () => {
    await connectToMetamask();

    const personalAddress = await getWalletAddress();
    setAddress(personalAddress);

    if (!personalAddress) return;

    setLoading(true);
    const token = await Web3Token.sign((msg: any) => web3.eth.personal.sign(msg, personalAddress, ""), '1d');
    setCookie(TOKEN_COOKIE_NAME, token)
    
    await createUser(token)
      .then(res => {
        setLoading(false);
        if (!navigate?.includes('app')) push('/app')
      })
      .catch()
  };

  return (
    <div className="relative">
      <button
        onClick={connect}
        className={className}
      >
        {
          address ? 
          <span className="text-lg">{getSimplifiedAddress(address)}</span>
          :
          <span className="text-lg">{ loading && <LoadingSM /> } { text }</span>
        }
      </button>
    </div>
  );
}
