import { NowRequest, NowResponse } from "@now/node";

export default (req: NowRequest, res: NowResponse) => {
  try {
    const demoData = {
      "0xbbb": {
        title: "Bla"
      }
    };

    res.status(200).json(demoData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
