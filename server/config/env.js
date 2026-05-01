/**
 * Environment variable validation.
 * Fail fast if required variables are missing — prevents cryptic runtime errors.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    console.error('   Please check your .env file in the project root.');
    process.exit(1);
  }
};

module.exports = { validateEnv };
