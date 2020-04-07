import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const useWeb3 = () => {
  const getWeb3 = async (): Promise<ethers.providers.Web3Provider> => {
    const providerOptions = {
      /* See Provider Options Section */
    };
    const web3Connect = new Web3Modal({
      network: "rinkeby", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });

    const provider = await web3Connect.connect();
    return new ethers.providers.Web3Provider(provider as any);
  };

  const getAddress = async (web3: any) => {
    const accounts = await web3.listAccounts();
    return accounts[0];
  };

  // useEffect(() => {
  //   const getAddress = () => {
  //     const doAsync = async () => {
  //       const web3 = await getWeb3();
  //       const accounts = await web3.listAccounts();
  //       if (accounts[0]) {
  //         setAddress(accounts[0]);
  //       }
  //     };
  //     doAsync();
  //   };
  //   getAddress();
  // }, []);

  return {
    getWeb3,
    getAddress
  };
};
