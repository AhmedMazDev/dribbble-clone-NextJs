import {
  initializeApp,
  applicationDefault,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import admin from "firebase-admin";

const secretKeys = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(secretKeys as ServiceAccount),
  });
}

export default admin;
