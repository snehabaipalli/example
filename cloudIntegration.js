const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const { Client } = require("pg");

// Azure Key Vault details
const keyVaultName = "key-vault17";
const vaultUrl = `https://${keyVaultName}.vault.azure.net/`;
//let secretName  // Name for the secret in Key Vault
const azureClientId = "d548b26a-1ae7-4fdd-8e38-d556b4074a14";
const azureTenantId = "468134f7-2d00-4141-aef3-c34ef6fba68d";
const azureClientSecret = "Rz98Q~8ltCbzFXG7HhOi1J9NhMkJiPiGwNCe-awF";
// Function to fetch PostgreSQL credentials from Key Vault
console.log(azureClientId,"\n",azureTenantId,"\n",azureClientSecret);
async function getKeyVaultSecret(username) {   // get the credentidals of specific username
  try {
    // Use Azure Identity library to authenticate to Azure Key Vault
    const credential = new DefaultAzureCredential({
      azureClientId,
      azureTenantId,
      azureClientSecret
    });
    console.log(credential);
    const secretClient = new SecretClient(vaultUrl, credential);
    console.log(secretClient);
    // Retrieve the PostgreSQL credentials from Azure Key Vault
    const secret = await secretClient.getSecret(username);
    console.log(secret);
    return secret, secret.value;
  } catch (error) {
    console.error("Error fetching secret:", error.message);
    throw error;
  }
}
getKeyVaultSecret("sneha");
// Function to post PostgreSQL credentials to Key Vault

/*async function postCredentialsToKeyVault(username, password) { // stroting in key vault
  try {
    // Use Azure Identity library to authenticate to Azure Key Vault
    const credential = new DefaultAzureCredential();
    const secretClient = new SecretClient(vaultUrl, credential);

    // Check if the secret already exists
    await secretClient.getSecret(username);
    console.log("Secret already exists in Key Vault. Not posting new credentials.");
  } catch (error) {
    if (error.statusCode === 404) {
      try {
        // If the secret doesn't exist, post the new credentials to Key Vault
        const credential = new DefaultAzureCredential();
        const secretClient = new SecretClient(vaultUrl, credential);

        await secretClient.setSecret(username, password);
        console.log("Credentials posted to Key Vault.");
      } catch (err) {
        console.error("Error posting credentials:", err.message);
      }
    } else {
      console.error("Error checking for existing secret:", error.message);
    }
  }
}*/


/*async function fetchCredentialsAndStoreInKeyVault() {  //fetching the credentials and validating according to the conditions
    try {
      // Simulate database connection to fetch username and password
      const pgConfig = {
        user: "postgres",
        password:"Vijaya@124",
        database: "postgres",
        port: 5432,
      };
  
      const client = new Client(pgConfig);
      await client.connect();
  
        let username = pgConfig.user;
        let password = pgConfig.password;
        await client.end();

        const keyVaultSecret = await getKeyVaultSecret(username);
  
        if (keyVaultSecret === username) {
          // Username matches the secret in Key Vault
          console.log("Username matches secret in Key Vault. Connecting to the database.");
  
          // Connect to the PostgreSQL database using the fetched credentials
          const pgConfigFromKeyVault = {
            user: username,
            password: keyVaultSecret.value, // Assuming password is not stored in Key Vault
            database: "postgres",
            port: 5432,
          };
  
          // Connect to the PostgreSQL database using Key Vault credentials
          const clientFromKeyVault = new Client(pgConfigFromKeyVault);
          await clientFromKeyVault.connect();
          console.log("Connected to PostgreSQL database using Key Vault credentials.");
  
          // Perform operations with the connected database if needed
          // ...
  
          await clientFromKeyVault.end(); // Close the Key Vault database connection
        } else {
          // Post the fetched credentials to Key Vault as the username is not a secret in Key Vault
          console.log("Username not found as a secret in Key Vault. Posting credentials.");
          await postCredentialsToKeyVault(username, password);
        }
  
      //await client.end(); // Close the initial database connection
    } catch (error) {
      console.error("Error:", error.message);
    }
  }*/
  
  // Call the function to fetch credentials and either connect to the database or store in Key Vault
  

// Call the function to fetch credentials and store in Key Vault

//fetchCredentialsAndStoreInKeyVault();

  
