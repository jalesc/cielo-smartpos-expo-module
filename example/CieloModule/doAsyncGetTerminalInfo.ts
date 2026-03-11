import CieloSmartpos from 'cielo-smartpos-expo-module';

export default async function doAsyncGetTerminalInfo() {
  return await CieloSmartpos.doAsyncGetTerminalInfo();
}
