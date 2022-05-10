
import { Asset, check, currentTimeMs, isAccount, Name, print, TableStore} from 'proton-tsc'
import { AllowContract } from 'proton-tsc/allow';
import { ALLOWED_SYMBOL, LIFETIME_DURATION, LIFETIME_LICENSE, LIFETIME_PRICE, MONTHLY_DURATION, MONTHLY_LICENSE, MONTHLY_PRICE, YEARLY_DURATION, YEARLY_LICENSE, YEARLY_PRICE} from './tfoundry.constant';
import { License } from './tfoundry.table';

@contract
export class tfoundry extends AllowContract {

  private licenseTable:              TableStore<License> = License.GetTable(Name.fromString('tfoundry'));

  @action("transfer",notify)
  transfer(from: Name, to: Name, quantity: Asset, memo: string): void {

    
    print(`transfer triggered ${quantity.amount.toString()} , ${quantity.symbol.getSymbolString()}, ${quantity.toString()}`)
    check(from != to, "cannot transfer to self");
    
    if (from != this.contract){
      //requireAuth(from);
    
      check(this.isPriceMatch(memo,quantity),`Price of ${quantity.amount}${quantity.symbol.getSymbolString()} not matching the ${memo} plan.`)
      check(this.isSymbolAllowed(quantity),"Symbol is not allowed")
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

      print('skipped cause the transfer if originated from the contract')

    }
    
  }

  extendsLicense (license:License,licenseType:string):License{
   
    license.end_date = license.end_date+(this.getLicenseDuration(licenseType) as i64)
    this.licenseTable.update(license,this.receiver);
    return license

  }
  createLicense (owner:Name,licenseType:string):License{

    const license = new License(owner,currentTimeMs()+(this.getLicenseDuration(licenseType) as i64));
    print(`create license for: ${license.owner.toString()}`);
    this.licenseTable.set(license,this.receiver);
    return license;

  }

  getLicenseDuration (licenseType:string = 'monthly'):number{


    if( licenseType == MONTHLY_LICENSE){
      return MONTHLY_DURATION;
    }
    if( licenseType ==  YEARLY_LICENSE){
      return YEARLY_DURATION;
    }
    
    if( licenseType == LIFETIME_LICENSE){
      return LIFETIME_DURATION
    }

    return 0

  }

  

  isSymbolAllowed (quantity:Asset):boolean{

    return quantity.symbol.getSymbolString() == ALLOWED_SYMBOL.getSymbolString();

  }

  isPriceMatch (licenseType:string,quantity:Asset):boolean {

  
        if( licenseType == MONTHLY_LICENSE){
          return quantity.amount==MONTHLY_PRICE.amount;
          
        }

        if( licenseType ==  YEARLY_LICENSE){
          return quantity.amount==YEARLY_PRICE.amount;
          
        }

        if( licenseType == LIFETIME_LICENSE){
          return quantity.amount==LIFETIME_PRICE.amount
          
        }

        return false;

    }

  }
