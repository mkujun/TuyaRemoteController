import hmacSHA256 from 'crypto-js/hmac-sha256';
import CryptoJS from 'crypto-js';

export const createTokenSign = (client_id, secret, t) => {
  let sign = CryptoJS.enc.Hex.stringify(hmacSHA256(client_id + t, secret));

  return sign.toUpperCase();
}

export const createServiceSign = (client_id, secret, t, token) => {
  let sign = CryptoJS.enc.Hex.stringify(hmacSHA256(client_id + token + t, secret));

  return sign.toUpperCase();
}
