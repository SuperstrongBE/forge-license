import { Name, Table, TableStore } from "proton-tsc";


@table("licenses")
class LicensesTable extends Table {

    constructor(
        public owner:Name = new Name(),
        public end_date:i64 = 0,
    ){
        super();
    }

    @primary
    get by_owner():u64{

        return this.owner.N;

    }
   

    static GetTable (code:Name):TableStore<License>{

        return new TableStore<License>(code,code,Name.fromString('license'));

    }



}

export class License extends LicensesTable {}