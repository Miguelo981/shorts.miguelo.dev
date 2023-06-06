import Web3 from "web3";
import Web3Token from "web3-token";

export var web3: Web3 | undefined;

export const DESTINATION_ADDRESS = "0x30beE3deAC5F0861d378e78e1004Cf1459e0b347",
 ETHEREUM_TOKEN_TYPE_STANDARD = 'ERC20';

export async function getBalance(address: string): Promise<string | undefined> {
    if (!web3) return;

    try {
        const balance = await web3.eth.getBalance(address);

        return web3.utils.fromWei(balance);
    } catch (err) {
        return '0';
    }
}

function isMetaMaskInstalled() {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
}

export async function isMetaMaskConnected() {
    const {ethereum} = window;
    const accounts = await ethereum?.request({method: 'eth_accounts'}) as string[];

    return accounts && accounts?.length > 0;
}

export async function checkMetamaskConnection() {
    if (!isMetaMaskInstalled()) {
        alert("Install metamask extension!!");
        return;
    }

    web3 = new Web3(window.ethereum as any);
}

export async function connectToMetamask() {
    if (!isMetaMaskInstalled()) {
        alert("Install metamask extension!!");
        return;
    }

    web3 = new Web3(window.ethereum as any);
    await window.ethereum?.request({ method: 'eth_requestAccounts' });
    //await window.ethereum?.enable();

    /* await window.ethereum.request({
        method: 'eth_requestAccounts',
    }).catch(console.log); */

    /* if (!checkIfChainExist(Number(window.ethereum.networkVersion))) {
        alert("This network is not allowed!!");
        return;
    } */
}

export async function disconnectWallet() {
    web3 = undefined;
}

export async function getNetworkBalance() {
    if (!web3) return { weiBalance: 0, balance: 0 };

    try {
        const address = await getWalletAddress();

        if (!address) return { weiBalance: 0, balance: 0 };

        const weiBalance = await web3.eth.getBalance(address);
        const balance = web3.utils.fromWei(weiBalance);

        return { weiBalance, balance };
    } catch (err) {
        return { weiBalance: 0, balance: 0 }
    }
}

export async function getWalletAddress(): Promise<string | undefined> {
    if (!web3) return;

    return (await web3.eth?.getAccounts())[0];
}

export async function sendNetworkBalance(owner: string, destination: string, value: number | string) {
    if (!web3) return;

    try {
        await web3.eth.sendTransaction({ from: owner, to: destination, value: web3.utils.toWei(value.toString()) })
            .then(console.log)
            .catch(console.log);
    } catch (err) {
        console.log(err);
    }
}

export async function verifyToken(token: string) {
    try {
        const { address, body } = await Web3Token.verify(token);

        return { address, body, status: true }
    } catch(err) {
        return { status: false };
    }
}