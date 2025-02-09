import { uploadJsonToPinata, retrieveJsonFromPinata } from "../../utils/pinata";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { financialData } = req.body;

      if (!financialData) {
        return res.status(400).json({ error: "No financial data provided" });
      }

      const ipfsHash = await uploadJsonToPinata(financialData);
      res.status(200).json({ success: true, ipfsHash });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else if (req.method === "GET") {
    try {
      const { ipfsHash } = req.query;

      if (!ipfsHash) {
        return res.status(400).json({ error: "No IPFS hash provided" });
      }

      const financialData = await retrieveJsonFromPinata(ipfsHash as string);
      res.status(200).json({ success: true, financialData });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}