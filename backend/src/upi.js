import QRCode from 'qrcode';

/**
 * Standard NPCI UPI URI generation
 */
export function generateUpiUri({ upiId, payeeName, amount, transactionNote, transactionRef }) {
  const params = new URLSearchParams();
  params.append('pa', upiId);
  params.append('pn', payeeName);
  params.append('cu', 'INR');

  if (amount && Number(amount) > 0) {
    params.append('am', Number(amount).toFixed(2));
  }

  if (transactionNote) {
    params.append('tn', transactionNote);
  }

  if (transactionRef) {
    params.append('tr', transactionRef);
  }

  return `upi://pay?${params.toString()}`;
}

/**
 * Generate QR code as Data URL (PNG)
 */
export async function generateQrDataUrl(upiUri) {
  return QRCode.toDataURL(upiUri, {
    errorCorrectionLevel: 'M',
    margin: 2,
    scale: 8,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
}

/**
 * Generate QR code as SVG string
 */
export async function generateQrSvg(upiUri) {
  return QRCode.toString(upiUri, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
  });
}

/**
 * Validates standard NPCI UPI Virtual Payment Address (VPA)
 */
export function isValidUpiId(upiId) {
  if (!upiId || typeof upiId !== 'string') return false;
  const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  return regex.test(upiId.trim());
}

/**
 * Validates standard 12-digit UPI UTR number
 */
export function isValidUtr(utr) {
  if (!utr || typeof utr !== 'string') return false;
  return /^[0-9]{12}$/.test(utr.trim());
}
