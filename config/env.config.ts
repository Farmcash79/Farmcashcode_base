export const envConfig = {
  environment: process.env.NODE_ENV,
  dbUrl: process.env.DATABASE_URL,

  appUrl: process.env.NEXT_PUBLIC_APP_URL,

  interswitchClientId: process.env.INTERSWITCH_CLIENT_ID,
  interswitchClientSecret: process.env.INTERSWITCH_CLIENT_SECRET,
  interswitchMerchantCode: process.env.INTERSWITCH_MERCHANT_CODE,
  interswitchPayItemId: process.env.INTERSWITCH_PAY_ITEM_ID,
  interswitchCollectionBaseUrl: process.env.INTERSWITCH_COLLECTION_BASE_URL,
  interswitchPassportBaseUrl: process.env.INTERSWITCH_PASSPORT_BASE_URL,

  interswitchCheckoutUrl: process.env.INTERSWITCH_CHECKOUT_URL,
};
