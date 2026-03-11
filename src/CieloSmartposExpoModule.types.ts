export type CieloResponse = {
  success: boolean;
  code: number | string;
  result: string;
}

type PurchaseItem = {
  name: string;
  quantity: number;
  sku: string;
  unitOfMeasure: string;
  unitPrice: number;
}

export type PaymentCode =
  | "DEBITO_AVISTA"
  | "CREDITO_AVISTA"
  | "CREDITO_PARCELADO_LOJA"
  | "VOUCHER_REFEICAO"
  | "VOUCHER_ALIMENTACAO"
  | "VOUCHER_BENEFICIOS"
  ;

export type PaymentData = {
  accessToken: string;
  clientID: string;
  reference?: string;
  merchantCode?: string;
  email: string;
  installments: number; // 0 para à vista
  items: PurchaseItem[];
  paymentCode: PaymentCode;
  value: string; // em centavos, ex: "1000" = R$10,00
}

export type CancelData = {
  id: string
  clientID: string
  accessToken: string
  cieloCode: string
  authCode: string
  value: number
}

export type PaymentResponse = {
  createdAt: string
  id: string
  items: Item[]
  notes: string
  number: string
  paidAmount: number
  payments: Payment[]
  pendingAmount: number
  price: number
  reference: string
  status: string
  type: string
  updatedAt: string
}

type Item = {
  description: string
  details: string
  id: string
  name: string
  quantity: number
  reference: string
  sku: string
  unitOfMeasure: string
  unitPrice: number
}

type Payment = {
  accessKey: string
  amount: number
  applicationName: string
  authCode: string
  brand: string
  cieloCode: string
  description: string
  discountedAmount: number
  externalId: string
  id: string
  installments: number
  mask: string
  merchantCode: string | null
  paymentFields: any[]
  primaryCode: string
  requestDate: string
  secondaryCode: string
  terminal: string
}

export type OperationPrintType = "PRINT_TEXT" | "PRINT_IMAGE"

export type PrintData = {
  operation: OperationPrintType
  styles: any
  value: string[]
}

export type TerminalInfo = {
  batteryLevel: number
  deviceModel: string
  imeiNumber: string
  logicNumber: string
  merchantCode: string
  serialNumber: string
}
