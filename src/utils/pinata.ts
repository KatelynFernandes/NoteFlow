import axios from "axios";
import FormData from "form-data";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

// Upload JSON data to Pinata
export const uploadJsonToPinata = async (jsonData: object): Promise<string> => {
  const formData = new FormData();
  formData.append("file", JSON.stringify(jsonData), {
    filepath: "data.json",
  });

  const response = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    }
  );
  return response.data.IpfsHash; // Return the IPFS hash
};

// Retrieve JSON data from Pinata
export const retrieveJsonFromPinata = async (ipfsHash: string): Promise<any> => {
  const response = await axios.get(`https://ipfs.io/ipfs/${ipfsHash}`);
  return response.data; // Return the JSON data
};