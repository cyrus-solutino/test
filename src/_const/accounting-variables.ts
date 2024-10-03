
export enum ISAAccountingClass {
  ASSET='ASSET',
  LIABILITIES='LIABILITIES',
  REVENUE='REVENUE',
  EXPENSE='EXPENSE',
}

export enum ISATransactionType {

  SALE = 'SALE',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
  DEBIT_ASSET = 'DEBIT_ASSET',
  CREDIT_ASSET = 'CREDIT_ASSET',
  DEBIT_LIABILITY = 'DEBIT_LIABILITY',
  CREDIT_LIABILITY = 'CREDIT_LIABILITY',
  DEBIT_EQUITY = 'DEBIT_EQUITY',
  CREDIT_EQUITY = 'CREDIT_EQUITY',

}

export interface ISAAccount {
  code: string, name: string, type?: string, accountID?: string, examples?: string, _class?: string,
}

