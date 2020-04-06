import { useWeb3 } from "./useWeb3";

var box3 = require("3box");

export const use3Box = () => {
  const { getWeb3 } = useWeb3();

  const getSpace = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.listAccounts();
    const address = accounts[0];
    const box = await box3.openBox(address, await (await getWeb3()).provider);
    const space = await box.openSpace("flash-invoice");
    await space.syncDone;
    console.log("Space sync done");
    return space;
  };

  return {
    getSpace,
  };
};

export interface Customer {
  name?: string;
  email?: string;
  orgNumber?: number;
  address1?: string;
  postcode?: number;
  city?: string;
}

export interface FlashInvoiceAccountPublic {
  name: string;
}

export interface FlashInvoiceAccountPrivate {
  customerList: string[];
  customers: { [customerId: string]: Customer };
}
