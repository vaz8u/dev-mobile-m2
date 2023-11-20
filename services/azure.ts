import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

export async function getKeyFromKeyVault(nom : string): Promise<string | undefined> {
  const vaultName = 'devWebM2GI';
  const secretName = nom;

  try {
    // Obtenez les informations d'identification à partir de l'environnement Azure
    const credential = new DefaultAzureCredential();

    // Créez un client pour accéder à Key Vault
    const url = `https://${vaultName}.vault.azure.net`;
    const client = new SecretClient(url, credential);

    // Récupérez la clé API à partir de Key Vault
    const secret = await client.getSecret(secretName);

    // Utilisez la clé API dans votre application React Native
    return secret.value;
  } catch (error) {
    console.error("Erreur lors de la récupération de la clé API depuis Key Vault :", error);
    return undefined;
  }
}