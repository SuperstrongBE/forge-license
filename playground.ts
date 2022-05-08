import { Blockchain } from "@proton/vert";
import { Name } from "proton-tsc";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const main = async () => {
  const blockchain = new Blockchain();

  const contract = blockchain.createContract('tfoundry', 'target/tfoundry.contract');
  const xTokens = blockchain.createContract('xtoken', 'node_modules/proton-tsc/external/xtokens/xtokens',true);
  
  const user = blockchain.createAccount('moule'); 
  await wait(0);

  await xTokens.actions.create([contract.name,'5000 XPR']).send('xtoken@active');
  await xTokens.actions.issue([contract.name,'1000 XPR','']).send('tfoundry@active');
  // Put you actions calls here
  //await contract.actions.setlicense([user.name,"monthly"]).send('tfoundry@active')
  await xTokens.actions.transfer([contract.name,user.name,'1000 XPR','monthly']).send('tfoundry@active');
  await xTokens.actions.transfer([user.name,contract.name,'10 XPR','monthly']).send('moule@active');
  await wait(5000);
  await xTokens.actions.transfer([user.name,contract.name,'10 XPR','monthly']).send('moule@active');
}

main()
