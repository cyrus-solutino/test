import { v3 } from "uuid";

const _const = {

  wsocketEvent: {
    connection: 'connection',
    disconnect: 'disconnect'
  },

  notification: {
    push : 'PUSH',
    broadcast : 'BROADCAST'
  },

  accountingSystem: {
    XERO: 'XERO',
    QBO: 'QBO',
    MYOB:'MYOB'
  },

  document: {
    external: 'external',
    dashboardUpload: 'dashboard_upload',
    output: 'output'
  },

  sequenceId: {
    user: "USER_SEQ_ID",
    company: "COMPANY_SEQ_ID",
    document: "DOCUMENT_SEQ_ID",
    role: "ROLE_SEQ_ID",
    xeroMigration : "XERO_MIGRATION"
  },

  entryProcessingTypes: {

    INV_SALES: 'INV_SALES',
    INV_EXPENSES: 'INV_EXPENSES',
    BILL: 'BILL',
    DEBIT_NOTE: 'DEBIT_NOTE',
    CREDIT_NOTE: 'CREDIT_NOTE',
    QUOTE: 'QUOTE',
    CLAIM: 'CLAIM',
    BANK_STMT: 'BANK_STMT',
    CONTRACT: 'CONTRACT',
    LETTER: 'LETTER',
    LIST_OF_TRANSACTIONS: 'LIST_OF_TRANSACTIONS',
    IRRELEVANT: 'IRRELEVANT',
    XERO_SPEND_MONEY: 'XERO_SPEND_MONEY',
    XERO_RECV_MONEY: 'XERO_RECV_MONEY',
    OTHERS: 'OTHERS'

  },

  docTypesDocumentArray: ['INV_SALES', 'BILL', 'INV_EXPENSES', 'XERO_SPEND_MONEY', 'XERO_RECV_MONEY', 'IRRELEVANT', 'OTHERS', 'CREDIT_NOTE'],
  lineItemColumns: ['description', 'quantity', 'unitAmount', 'accountCode', 'taxAmount', 'taxRate', 'taxType', 'taxPriceType'],
  lineItemV1Columns: ['Description', 'Quantity', 'UnitAmount', 'AccountCode', 'TaxAmount', 'TaxRate', 'TaxType', 'TaxPriceType'],

  documentProcessStatus : {
    PROCESSING: 'processing',
    PENDING: 'pending',
    DUPLICATE: 'duplicate',
    FAILED: 'failed',
    REQUIRES_CATEGORY: 'learning',
    PROCESSED: 'processed',
    POSTED: 'posted',
    PUBLISHED: 'published',
    DELETED: 'deleted',
  },

  queue:{
    GPT4V: 'queryGPT4Vision',
    GPT4T: 'queryGPT4Turbo',
    GPT4: 'queryGPT4',
    GPT35: 'queryGPT35',
    claude: 'queueClaude',
    GPT4O: 'queueGPT4O',
    embeddings: 'embeddings',
    status: {
      queued: 'queued',
      pending: 'pending',
      failed: 'failed',
      interrupted: 'interrupted',
      retrying: 'retrying',
      completed: 'completed',
      error: 'error',
    }
  },

  documentProcessingQueue: {
    checkAccountData: 'checkAccountData',
    generateOcrOutput: 'generateOcrOutput',
    createEmbeddings: 'createEmbeddings',
    initialIdentification: 'initialIdentification',
    assignAccountData: 'assignAccountData',
    finalIdentification: 'finalIdentification',
  },

  accountingSystemPostStatus: {
    waitingReview: 'waitingReview',
    posted: 'posted',
    changeInAccountingSystem: 'changeInAccountingSystem',
  },

  categoryQueue: {
    ocr: 'queryCategoryOCR',
    embeddings: 'queryCategoryEmbeddings',
    generate: 'queryCategoryGenerate',
    queryIndex: 'queryCategoryIndex',
    insertIndex: 'insertCategoryIndex',
    jobType: {
      ocr: 'ocr',
      embeddings: 'embeddings',
      generate: 'generate',
      queryIndex: 'queryIndex',
      insertIndex: 'insertIndex',
    },
  },

  gptModel: {
    gpt4V: 'gpt-4-vision-preview',
    embeddingModel: 'text-embedding-ada-002'
  },

  claudeModel: {
    haiku: 'claude-3-haiku-20240307',
    opus: 'claude-3-opus-20240229',
    sonnet: 'claude-3-sonnet-20240229',
    sonnet35: 'claude-3-5-sonnet-20240620'
  },

  pinecone: {
    SAIndex: 'research-2023',
    SAV3Index: 'sa-index-2024-v3'
  },

  ocrRule: {
    VIN_AUTO_LEFT_RIGHT: 'VIN_AUTO_LEFT_RIGHT'
  },

  collection: {

    audit: {
      loginHistory: 'loginhistories',
      permissionHistory: 'permissionhistories',
    },

    bullmq: {
      job: 'jobs',
    },

    system: {
      scriptVersion: 'systemscriptversions'
    },

    google: {
      watchResources: 'googlewatchresources',
      ocrResult: 'googleocrresults',
    },

    homepage: {
      webProcessingRequest: 'webprocessingrequests',
    },

    myob: {
      tokenSet: 'myobtokensets',
      vendor: 'myobvendors',
      account: 'myobaccounts',
      taxCodes: 'myobtaxcodes',
      invoices: 'myobinvoices',
      customer: 'myobcustomers',
      item: 'myobitems'
    },

    qbo: {
      account: 'qboaccounts',
      customer: 'qbocustomers',
      item: 'qboitems',
      tokenSet: 'qbotokensets',
      vendor: 'qbovendors',
    },

    xero: {
      account: 'xeroaccounts',
      contact: 'xerocontacts',
      taxType: 'xerotaxtypes',
      tokenSet: 'xerotokensets',
      tokenMap: 'xerotokencompanymap',
      appStoreTempUser: 'xeroappstoretempusers',
      invoice: 'xeroinvoices',
      webhook: 'xerowebhooks',
      currencies:'xerocurrencies'
    },

    xeRate: {
      openExchangeRate: 'xeopenexchangerates',
    },

    category: {
      driver: 'categorydriver',
      job: 'categoryjobs',
      document: 'categorydocuments',
      rules: 'categoryrules',

      v3: {
        category: 'v3categories',
        metadata: 'v3categorymetadata',
        rangeHistory: 'v3categoryrangehistories',
        companyRule: 'v3categorycompanyrules',
        companyRuleHistory: 'v3categorycompanyrulehistories',
        humanReviewEvent: 'v3categoryhumanreviewevents',
      }
    },

    stripe: {
      transaction: 'stripetransactions',
    },

    subscription: {

      plan: 'subscriptionplans',
      status: 'subscriptionstatuses',
      log: 'subscriptionlogs',
      session: 'subscriptionsessions',
      payment: 'subscriptionpayments',
      stripeLog: 'subscriptionstripelogs',

    },

    reconcile: {
      bankStatementRow: 'reconbankstatementrows',
      transactionRow: 'recontransactionrows',
      checkMonth: 'reconcheckmonths',
      checkFiscalYear: 'reconcheckfiscalyears',
      candidateCompany: 'reconcandidatecompanies',

      v2: {
        openings: 'reconv2openings',
        staging: 'reconv2stagings',
      }
    },

    bulkRequest: 'bulkrequests',
    country: 'countries',
    currency: 'currencies',
    company: 'sacompanies',
    document: 'sadocuments',
    companyemails: 'sacompanyemails',
    supportingDocument: 'sasupportingdocuments',
    processResult: 'saprocessresults',
    learning: 'salearnings',
    user: 'sausers',
    systemVariable: 'systemvariables',
    timezone: 'timezones',
    emailRecoveryToken: 'emailrecoverytokens',
    httpRequestLog: 'httprequestlogs',
    industry: 'industries',
    modification: 'modifications',
    operationAlerts: 'operationalerts',
    role: 'saroles',
    companyGrant: 'companygrants',
    embeddings: 'embeddings',
    ocrOutput: 'ocroutputs',
    emailLog: 'emaillogs',
    iscaEmail: 'iscaemails',
    invitations:'sainvitations',
    azureocroutput:'azureocroutputs',
    passwordRecovery: 'passwordrecoverytokens',
    azureOCROutput: 'azureocroutputs',

    v4: {
      document: 'sav4documents',
      generalReconcile: 'sav4generalreconciles',
      reconTrade: 'sav4recontrades',
      reconBankTx: 'sav4reconbanktxs',
      reconAction: 'sav4reconactions',
      reconResultLine: 'sav4reconresultlines',
    },
    v3 : {
      document: 'sav3documents',
    },
    notifications: 'notifications',
  },

  accountingSystemLabel: function(key: string): string {

    switch (key) {
      case 'QBO': return 'Quickbook';
      case 'XERO': return 'Xero';
    }
    return 'N/A';

  },

  manualInputIndicator: {

  },

  manualInputIndicatorColor: {
    BLUE: 'BLUE',
    YELLOW: 'YELLOW',
    GREEN: 'GREEN',
    RED: 'RED',
    ORANGE: 'ORANGE',
  },

  processingIssues: {
    NONE: 'NONE',
    LINE_ITEMS_TO_TAX_MISMATCH: 'LINE_ITEMS_TO_TAX_MISMATCH',
    LINE_ITEMS_TO_TAX_RECOVERED: 'LINE_ITEMS_TO_TAX_RECOVERED',
    SUBTOTAL_VALIDATION_FAILED: 'SUBTOTAL_VALIDATION_FAILED',
    INCONSISTENT_ACCOUNT: 'INCONSISTENT_ACCOUNT',
    UNABLE_TO_CATEGORIZE: 'UNABLE_TO_CATEGORIZE',
  },

  shouldPostPythonToCentral: function(): boolean {
    return false;
  },

  categoryEngineHost: function() {
    return this.shouldPostPythonToCentral() ? process.env.PYTHON_MODULE_ENDPOINT : process.env.PYTHON_MODULE_ENDPOINT;
  }

};

export default _const;
