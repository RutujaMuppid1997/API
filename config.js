require('dotenv').config();

module.exports = {
  port: process.env[`${process.env.NODE_ENV}_PORT`], 
  databaseHost: process.env[`${process.env.NODE_ENV}_DB_HOST`],
  databaseUser: process.env[`${process.env.NODE_ENV}_DB_USER`],
  databasePassword: process.env[`${process.env.NODE_ENV}_DB_PASSWORD`],
  databaseName: process.env[`${process.env.NODE_ENV}_DB_NAME`],
  databaseInitial: process.env[`${process.env.NODE_ENV}_DB_INITIAL`],
  databasePort: process.env[`${process.env.NODE_ENV}_DB_PORT`],
  tokenkey: process.env[`${process.env.NODE_ENV}_TOKEN_KEY`],
  bodyEncryption: false,
  cryptokey: process.env[`${process.env.NODE_ENV}_CRYPTO_KEY`],
  minContribution: process.env[`${process.env.NODE_ENV}_MINI_CONTRIBUTION`],
  yBTokenPrice: process.env[`${process.env.NODE_ENV}_YB_TOKEN_PRICE`],
  yBMaxContri: process.env[`${process.env.NODE_ENV}_YB_MAX_CONTRI`],
  yBSupply: process.env[`${process.env.NODE_ENV}_YB_SUPPLY`],
  yCashTokenPrice: process.env[`${process.env.NODE_ENV}_YCASH_TOKEN_PRICE`],
  yCashMaxContri: process.env[`${process.env.NODE_ENV}_YCASH_MAX_CONTRI`],
  yCashSupply: process.env[`${process.env.NODE_ENV}_YCASH_SUPPLY`],
  yBDepositAddress: process.env[`${process.env.NODE_ENV}_YB_DEPOSIT_ADDRESS`],
  yCashDepositAddress:
    process.env[`${process.env.NODE_ENV}_YCASH_DEPOSIT_ADDRESS`],
  yBLiquidityDepositAddress:
    process.env[`${process.env.NODE_ENV}_YB_LIQUIDITY_DEPOSIT_ADDRESS`],
  yCashLiquidityDepositAddress:
    process.env[`${process.env.NODE_ENV}_YCASH_LIQUIDITY_DEPOSIT_ADDRESS`],
  uniswapRouterAddress:
    process.env[`${process.env.NODE_ENV}_UNISWAP_ROUTER_ADDRESS`],
  yBCompoundInterfaceAddress:
    process.env[`${process.env.NODE_ENV}_YB_COMPOUND_INTERFACE`],
  yBUniswapInterfaceAddress:
    process.env[`${process.env.NODE_ENV}_YB_UNISWAP_INTERFACE`],
  web3Provider: process.env[`${process.env.NODE_ENV}_WEB3_PROVIDER`],
  web3Network: process.env[`${process.env.NODE_ENV}_WEB3_NETWORK`],
  recaptchaSecret: process.env[`${process.env.NODE_ENV}_RECAPTCHA_SECRET`],
};
