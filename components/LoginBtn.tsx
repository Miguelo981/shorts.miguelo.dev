"use client";

import { useEffect, useState } from "react";
import {
  checkMetamaskConnection,
  connectToMetamask,
  getWalletAddress,
} from "../services/metamask";
import { getSimplifiedAddress } from "../utils/text";

export default function LoginBtn() {
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    (async () => {
      await checkMetamaskConnection();
      setAddress(await getWalletAddress());
    })();
  }, []);

  const connect = async () => {
    await connectToMetamask();

    setAddress(await getWalletAddress());
  };

  return (
    <div className="relative">
      <button
        onClick={connect}
        className="app-cta-btn app-btn bg-gray-800 hover:bg-gray-900"
      >
        {address ? (
          <span className="text-lg">{getSimplifiedAddress(address)}</span>
        ) : (
          <span className="text-lg">Connect</span>
        )}
      </button>
    </div>
  );
}
