export class User {

  constructor(
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public name?: string,
    public firstname?: string,
    public lastname?: string,
    public email?: string,
    public password?: string,
    public status?: string,
    public data?: any,
    // tslint:disable-next-line: variable-name
    public stripe_id?: string,
    // tslint:disable-next-line: variable-name
    public card_brand?: string,
    // tslint:disable-next-line: variable-name
    public card_last_four?: string,
        // tslint:disable-next-line: variable-name
    public trial_ends_at?: string,
        // tslint:disable-next-line: variable-name
    public remember_token?: string,
        // tslint:disable-next-line: variable-name
    public last_login?: string,
    public score?: string,
    public actions?: string,
    public contacted?: string,
        // tslint:disable-next-line: variable-name
    public social_accounts?: any,
    public dashboards?: any,
    public benchmarks?: any,
    public pack?: any,
        // tslint:disable-next-line: variable-name
    public created_at?: any,
        // tslint:disable-next-line: variable-name
    public updated_at?: any,
    // tslint:disable-next-line: variable-name
    public deleted_at?: any,
    public pwd?: any,
    // tslint:disable-next-line: variable-name
    public provider_userId?: any,
  ) {}
}
