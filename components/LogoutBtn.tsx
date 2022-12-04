"use client";

import {
  disconnectWallet,
} from "../services/metamask";

export default function LogoutBtn() {
  const logout = async () => {
    await disconnectWallet();
  };

  return (
    <button
      onClick={logout}
      className="app-btn rounded-lg py-1 px-8 border-transparent shadow-lg max-w-xs"
    >
      <strong className="text-2xl">Logout</strong>
    </button>
  );
}
