import { Blockchain, nameToBigInt } from "@proton/vert";
import { TableView } from "@proton/vert/dist/proton/table";
import { Name } from "proton-tsc";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

const main = async () => {
  const blockchain = new Blockchain();
  const contract   = blockchain.createContract('tfoundry', 'target/tfoundry.contract');
  const xTokens    = blockchain.createContract('xtoken', 'node_modules/proton-tsc/external/xtokens/xtokens',true);
  
  const user = blockchain.createAccount('moule');
  await wait(0);

  await xTokens.actions.create([contract.name,'5000000000 XPR']).send('xtoken@active');
  await xTokens.actions.issue([contract.name,'1000000000 XPR','']).send('tfoundry@active');
  
  await xTokens.actions.transfer([contract.name,user.name,'1000000000 XPR','monthly']).send('tfoundry@active');

  await xTokens.actions.transfer([user.name,contract.name,'100000 XPR','monthly']).send('moule@active');
  await wait(5000);
  await xTokens.actions.transfer([user.name,contract.name,'1000000 XPR','yearly']).send('moule@active');
  await wait(5000);
  await xTokens.actions.transfer([user.name,contract.name,'1500000 XPR','lifetime']).send('moule@active');
  await wait(5000);

  
  const tlb = contract.tables!.licenses(nameToBigInt(contract.name)).getTableRow(nameToBigInt(user.name));
  console.log(JSON.stringify(tlb)) // Show and empty objeect

}

main()
