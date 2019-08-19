// Wrap in a try/catch just in case if something terrible happens.
try {
require('dotenv').config();
}
catch (e) {
  console.error(e)
}

/** The medimap clinic id. */
export const CLINIC_ID = process.env.MEDIMAP_CLINIC_ID || null;

/** The clinic name. */
export const CLINIC_NAME = process.env.CLINIC_NAME || 'Clinic';
