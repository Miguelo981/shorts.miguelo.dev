"use client";

import { useEffect, useState } from "react";
import { getWalletAddress } from "../services/metamask";
import { getSimplifiedAddress } from "../utils/text";
import LoadingSM from "./LoadingSM";

type AddressBtnProps = {
  className?: string;
}

export default function AddressBtn({ className="app-cta-btn app-btn bg-gray-900 hover:bg-gray-800" }: AddressBtnProps) {
  const [address, setAddress] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const walletAddress = await getWalletAddress();

      setLoading(false);
      setAddress(walletAddress ? getSimplifiedAddress(walletAddress) : "");
    })();
  }, []);

  return (
    <div className="relative">
      <button
        className={className}
        disabled={loading}
      >
        <span className="text-xl">
          { 
            loading ? 
              <span className="flex items-center gap-2"><LoadingSM /></span> 
            : address
          }
        </span>
      </button>
    </div>
  );
}
