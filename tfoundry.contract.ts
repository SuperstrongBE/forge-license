
import { Asset, check, currentTimeMs, isAccount, Name, print, TableStore} from 'proton-tsc'
import { AllowContract } from 'proton-tsc/allow';
import { sendTransferTokens } from 'proton-tsc/token';
import { LIFETIME_DURATION, LIFETIME_LICENSE, MONTHLY_DURATION, MONTHLY_LICENSE, YEARLY_DURATION, YEARLY_LICENSE } from './tfoundry.constant';
import { License } from './tfoundry.table';

@contract
export class tfoundry extends AllowContract {

  private licenseTable:              TableStore<License> = License.GetTable(Name.fromString('tfoundry'));

  @action("transfer",notify)
  transfer(from: Name, to: Name, quantity: Asset, memo: string): void {

    print('transfer triggered')
    check(from != to, "cannot transfer to self");
    if (from != this.contract){
      //requireAuth(from);
      check(isAccount(from), "to account does not exist");

      const license = this.licenseTable.lowerBound(from.N);
      if (!license) {

        print('will create')
        this.createLicense(from,memo);

      }else {

        print(`will extends ${license.end_date.toString()} ${license.owner.toString()}`)
        this.extendsLicense(license,memo)
        this.licenseTable.update(license,this.receiver)

      }
    }else {

      print('skipped   cause the transfer if originated from the contract')

    }
    
  }

  @action("register")
  register(from: Name, to: Name, memo: string): void {

    print('register call')
    check(from != to, "cannot transfer to self");
    if (from != this.contract){
      //requireAuth(from);
      check(isAccount(from), "to account does not exist");

      const license = this.licenseTable.lowerBound(from.N);
      if (!license) {

        print('will create')
        this.createLicense(from,memo);

      }else {

        print(`will extends ${license.end_date.toString()} ${license.owner.toString()}`)
        this.extendsLicense(license,memo)
        this.licenseTable.update(license,this.receiver)

      }
    }else {

      print('skipped   cause the transfer if originated from the contract')

    }
    
  }

  

  extendsLicense (license:License,licenseType:string):License{
   
    license.end_date = license.end_date+(this.getLicenseEndDate(licenseType) as i64)
    this.licenseTable.update(license,this.receiver);
    return license

  }
  createLicense (owner:Name,licenseType:string):License{

    const license = new License(owner,currentTimeMs()+(this.getLicenseEndDate(licenseType) as i64));
    print(`create license for: ${license.owner.toString()}`);
    this.licenseTable.set(license,this.receiver);
    return license;

  }

  getLicenseEndDate (licenseType:string = 'monthly'):number{

    if (licenseType == MONTHLY_LICENSE) return MONTHLY_DURATION;
    if (licenseType == YEARLY_LICENSE) return YEARLY_DURATION;
    if (licenseType == LIFETIME_LICENSE) return LIFETIME_DURATION;
    return MONTHLY_DURATION;

  }

  isPriceMatch ():boolean {


    

  }


}
