
// AES-256-GCM Encryption Utility using Web Crypto API

const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;

// Gera uma chave simétrica baseada em uma "System Master Key" (Simulada para demo)
async function getKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const masterKeyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode("WINF-QUANTUM-SYSTEM-SECRET-KEY-2025"), // Em produção, isso viria de um ENV ou Key Vault
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("winf-salt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    masterKeyMaterial,
    { name: ALGORITHM, length: KEY_LENGTH },
    false,
    ["encrypt", "decrypt"]
  );
}

export const encryptData = async (text: string): Promise<{ cipherText: string; iv: string }> => {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);

  const encrypted = await window.crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded
  );

  return {
    cipherText: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    iv: btoa(String.fromCharCode(...iv))
  };
};

export const decryptData = async (cipherText: string, ivStr: string): Promise<string> => {
  try {
    const key = await getKey();
    const iv = new Uint8Array(atob(ivStr).split("").map(c => c.charCodeAt(0)));
    const data = new Uint8Array(atob(cipherText).split("").map(c => c.charCodeAt(0)));

    const decrypted = await window.crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      data
    );

    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.error("Decryption failed", e);
    return "Falha na descriptografia: Chave inválida ou dados corrompidos.";
  }
};
