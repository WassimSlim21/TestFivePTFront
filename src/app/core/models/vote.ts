export class Vote {
  constructor(
    public _id?: string,
    public user_id?: string,
    public sondage_id?: string,
    public vote?: any,
    public created_at?: any,
    public updated_at?: any
  ) {}
}
