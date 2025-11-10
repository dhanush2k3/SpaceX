import { generateChallenge } from 'react-native-pkce-challenge';

const generateCodeVerifier = (length = 128) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let verifier = '';
  for (let i = 0; i < length; i++) {
    verifier += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return verifier;
};

export function generatePkcePair() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateChallenge(codeVerifier);

  return { codeVerifier, codeChallenge };
}