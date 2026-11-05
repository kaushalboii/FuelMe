import QRCode from 'qrcode';

export interface UpiPaymentDetails {
  upiId: string;
  payeeName: string;
  amount: number;
  transactionNote?: string;
  transactionRef?: string;
}

/**
 * Validates a UPI ID format (e.g., username@bank, mobile@upi)
 */
export function isValidUpiId(upiId: string): boolean {
  if (!upiId) return false;
  // Standard UPI ID format: [handle]@[bank]
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z0-9]{2,64}$/;
  return upiRegex.test(upiId.trim());
}

/**
 * Validates a 12-digit UPI UTR / Transaction Reference Number
 */
export function isValidUtr(utr: string): boolean {
  if (!utr) return false;
  const cleanUtr = utr.trim();
  // 12-digit numeric string standard for UPI UTRs
  return /^\d{12}$/.test(cleanUtr);
}

/**
 * Generates a standardized NPCI UPI Intent URI
 * Format: upi://pay?pa=...&pn=...&am=...&cu=INR&tn=...&tr=...
 */
export function generateUpiUri(details: UpiPaymentDetails): string {
  const { upiId, payeeName, amount, transactionNote = 'Fuel on FuelMe', transactionRef } = details;
  
  const params = new URLSearchParams({
    pa: upiId.trim(),
    pn: payeeName.trim(),
    am: amount.toFixed(2),
    cu: 'INR',
    tn: transactionNote.slice(0, 50), // UPI limits note length
  });

  if (transactionRef) {
    params.append('tr', transactionRef);
  }

  return `upi://pay?${params.toString()}`;
}

/**
 * Generates direct app deep links for specific UPI applications
 */
export function getAppSpecificUpiLinks(details: UpiPaymentDetails) {
  const universalUri = generateUpiUri(details);
  const encodedQuery = universalUri.replace('upi://pay?', '');

  return {
    universal: universalUri,
    googlePay: `tez://upi/pay?${encodedQuery}`,
    phonePe: `phonepe://pay?${encodedQuery}`,
    paytm: `paytmmp://pay?${encodedQuery}`,
    bhim: `bhim://pay?${encodedQuery}`,
    cred: `cred://upi/pay?${encodedQuery}`,
  };
}

/**
 * Generates a high-quality QR code data URL from payment details
 */
export async function generateUpiQrCode(details: UpiPaymentDetails): Promise<string> {
  const uri = generateUpiUri(details);
  try {
    const dataUrl = await QRCode.toDataURL(uri, {
      width: 400,
      margin: 2,
      color: {
        dark: '#1e293b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Failed to generate UPI QR code', err);
    throw err;
  }
}

/**
 * Generates a unique transaction reference for tracking
 */
export function generateTxnRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FUEL${timestamp}${random}`;
}
