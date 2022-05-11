# forge-license

A basic smart contract that ue transfer notification. Deployed on testnet under the tfoundry account
Don't use it in production !!!!

## How to use 
[code]
import { Api, JsonRpc } from '@proton/js';
import {
  GetAccountResult,
  GetTableRowsResult,
} from '@proton/js/dist/rpc/types';

const rpc = new JsonRpc(['http://proton-api-testnet.eosiomadrid.io','http://bp1-testnet.euproton.com']);
    const api = new Api({
      rpc: rpc,
    });
    
    const registerLicenseAction = {}
    
    const tableRow = await rpc.get_table_rows(
      {
        scope:'tfoundry',
        code:'tfoundry',
        table:'licenses',
        lower_bound:session.session.auth.actor,
        upper_bound:session.session.auth.actor 
      }
    );
    console.log (tableRow)

[/code]
