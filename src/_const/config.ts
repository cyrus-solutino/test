const _config = {

  concurrency: {
    GPT4: 10,
    GPT4AltPerc: 0.3,
    GPT4T: 30,
    GPT4V: 5,
    GPT4O: 30,
    embeddings: 25,

    claude: 5,

    categoryOCR: 10,
    categoryEmbeddings: 25,
    categoryGenerate: 20,
    categoryQueryIndex: 25,
    categoryInsertIndex: 1,
  },

  delayOnFail: 300000,
  maxRetryOnFail: 3,

  categoryNumberOfSamples: 20,
  pollingMaxAttempt: 8,
  pollingMaxTimeout: 300000,

  green: 'GREEN',
  yellow: 'YELLOW',
  red: 'RED',
  blue: 'BLUE',
  black: 'BLACK',
  teal: 'TEAL',
  
  upperConfidence : 0.85,
  lowerConfidence : 0.4,
  
  trimLengthEmbedding: 8000,
  DEFAULT_ACCOUNT_PASSWORD: "SIMPLEAI12345678",

  processingVersion: '',
  // processingVersion: '/v2',

  embeddingsModel: 'text-embedding-3-large',

};

export default _config;
