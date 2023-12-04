import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xF94c35f58ABc8f450bf86Fe8E5cCE3e5e1F48196"
);

export default instance;
