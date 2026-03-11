// Reexport the native module. On web, it will be resolved to CieloSmartposExpoModule.web.ts
// and on native platforms to CieloSmartposExpoModule.ts
export { default } from './CieloSmartposExpoModule';
export * from  './CieloSmartposExpoModule.types';

//Wrappers
import CieloSmartposExpoModule from "./CieloSmartposExpoModule";
import {
  CancelData,
  CieloResponse,
  PaymentData,
  PrintData,
} from "./CieloSmartposExpoModule.types";

export async function doAsyncPayment(
  data: PaymentData
): Promise<CieloResponse> {
  return CieloSmartposExpoModule.doAsyncPayment(JSON.stringify(data));
}

export async function doAsyncVoidPayment(
  data: CancelData
): Promise<CieloResponse> {
  return CieloSmartposExpoModule.doAsyncVoidPayment(JSON.stringify(data));
}

export async function doAsyncPrintText(
    data: PrintData
): Promise<CieloResponse> {
  return CieloSmartposExpoModule.doAsyncPrintText(JSON.stringify(data));
}

export async function doAsyncPrintBitmap(
    data: PrintData
): Promise<CieloResponse> {
  return CieloSmartposExpoModule.doAsyncPrintBitmap(JSON.stringify(data));
}

export async function doAsyncGetTerminalInfo(): Promise<CieloResponse> {
  return CieloSmartposExpoModule.doAsyncGetTerminalInfo();
}

export function getSerialNumber(): string {
  return CieloSmartposExpoModule.getSerialNumber();
}
