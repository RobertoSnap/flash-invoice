import { useState } from "react";
import { useWeb3 } from "./useWeb3";

var box3 = require("3box");

export const use3Box = () => {
  const { address, getWeb3 } = useWeb3();
  const [space, setSpace] = useState<any | undefined>();
  const [name, setName] = useState<string>();

  const getSpace = async () => {
    if (address) {
      const tempBox = await box3.openBox(
        address,
        await (await getWeb3()).provider
      );
      // await tempBox.syncDone;
      // console.log("Box has been synced");
      const tempSpace = await tempBox.openSpace("flash-invoice");
      await tempSpace.syncDone;
      console.log("Space has been synced");
      setSpace(tempSpace);
      tempSpace.public.get("name").then((name: string) => {
        if (name) setName(name);
      });
    } else {
      console.log("Skipped getting space because no address from web3");
    }
  };

  return {
    space,
    getSpace,
    name,
    address
  };
};
