import {
  initializeApp,
  applicationDefault,
  getApps,
  ServiceAccount,
} from "firebase-admin/app";
import admin from "firebase-admin";
import secretKeys from "../../secretKeys.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(secretKeys as ServiceAccount),
  });
}

export default admin;
