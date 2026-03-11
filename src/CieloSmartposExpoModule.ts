import { NativeModule, requireNativeModule } from 'expo';

import { CieloResponse } from './CieloSmartposExpoModule.types';

declare class CieloSmartposExpoModule extends NativeModule {
  doAsyncPayment(json: string): Promise<CieloResponse>;
  doAsyncVoidPayment(json: string): Promise<CieloResponse>
  doAsyncPrintText(json: string): Promise<CieloResponse>
  doAsyncPrintBitmap(json: string): Promise<CieloResponse>
  doAsyncGetTerminalInfo(): Promise<CieloResponse>
  getSerialNumber(): string;
}


// This call loads the native module object from the JSI.
export default requireNativeModule<CieloSmartposExpoModule>('CieloSmartposExpoModule');
