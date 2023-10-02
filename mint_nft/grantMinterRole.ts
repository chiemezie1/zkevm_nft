import { getDefaultProvider, Wallet } from "ethers";
import { Provider, TransactionResponse } from "@ethersproject/providers";
import { ERC721Client } from "@imtbl/zkevm-contracts";
require('dotenv').config();

const CONTRACT_ADDRESS = process.env.ECONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.EPRIVATE_KEY;
console.log(PRIVATE_KEY, CONTRACT_ADDRESS)
if (CONTRACT_ADDRESS && PRIVATE_KEY) {
  const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

  const grantMinterRole = async (
    provider: Provider
  ): Promise<TransactionResponse> => {
    // Bound contract instance
    const contract = new ERC721Client(CONTRACT_ADDRESS);
    // The wallet of the intended signer of the mint request
    const wallet = new Wallet(PRIVATE_KEY, provider);

    // Give the wallet minter role access
    const populatedTransaction = await contract.populateGrantMinterRole(
      wallet.address
    );
    const result = await wallet.sendTransaction(populatedTransaction);
    console.log("Minter Role Granted");
    return result;
  };

  grantMinterRole(provider);
} else {
  console.error("CONTRACT_ADDRESS or PRIVATE_KEY is undefined.");
}
