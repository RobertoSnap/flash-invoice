import { ethers } from "@nomiclabs/buidler";
import { Signer } from "ethers";
import { BigNumber } from "ethers/utils";

async function main() {
  const address = await getAddress();
  console.log("Deploy address   =>", address);
  const factory = await ethers.getContract("CapTable");
  let contract = await factory.deploy();
  console.log("Contract address =>", contract.address);
  console.log("hash             => ", contract.deployTransaction.hash);
  await contract.deployed();
  console.log("Contract has been deployed");
}

const getSigner = async (): Promise<Signer> => {
  return (await ethers.getSigners())[0];
};

const getAddress = async (): Promise<string> => {
  return await (await getSigner()).getAddress();
};

const getBalance = async (address: string): Promise<BigNumber> => {
  return await ethers.provider.getBalance(address);
};

const getTransactionCount = async (address: string): Promise<number> => {
  return await ethers.provider.getTransactionCount(address);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    // Object.keys(error).forEach(key => {
    //   console.log(key);
    // });
    console.log(error.reason);
    console.log(error.code);
    process.exit(1);
  });
