import axios from "axios";
import { userManager } from "./authService";

const AUTH_BASE = "/auth-proxy";
const ENCR_BASE = "/encr-proxy";
const SERVICES_BASE = "https://services-cboi-uat.isupay.in/";

const ENCR_KEY = "82gbZpEWVzTcL5qXB+kSKCes7XbqdNxqKjQeDgdnJX0=";
const PASS_KEY = "c0CKRG7yNFY3OIxY92izqj0YeMk6JPqdOlGgqsv3mhicXmAv";

const apiAuth = axios.create({ baseURL: AUTH_BASE });
const apiEncr = axios.create({ baseURL: ENCR_BASE });
const apiServices = axios.create({ baseURL: SERVICES_BASE });

async function getToken() {
  const user = await userManager.getUser();
  return user?.access_token || "";
}

apiAuth.interceptors.request.use(async (config) => {
  const token = await getToken();

  config.headers.Authorization = token;
  config.headers["pass_key"] = PASS_KEY;

  return config;
});

async function encryptData(data) {
  const res = await apiEncr.post("/encr", data, {
    headers: { Key: ENCR_KEY },
  });

  return res.data?.RequestData;
}

async function decryptData(cipher) {
  const res = await apiEncr.post(
    "/decr",
    { req: cipher }, 
    { headers: { Key: ENCR_KEY } }
  );

  return res.data;
}

export const apiService = {
  fetchUserById: async (params) => {
    const encrypted = await encryptData(params);

    const res = await apiAuth.post("/CBOI/fetch/fetchById", {
      RequestData: encrypted,
    });

    const cipher =
      res.data?.data ||
      res.data?.Data ||
      res.data?.ResponseData;

    const decrypted = await decryptData(cipher);

    return decrypted;
  },

  fetchReport: (payload) => {
    return apiServices.post("/CBOI/reports/querysubmit_username", payload);
  },

  qrToBase64: async (qrString) => {
    try {
      const encrypted = await encryptData({
        qrString,
      });

      const res = await apiAuth.post("/CBOI/merchant/qr_convert_to_base64", {
        RequestData: encrypted,
      });

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("QR API error:", err);
      throw err;
    }
  },

  getDynamicQR: async ({ txnAmount, serialNo, vpa_id }) => {
    try {
      const res = await apiServices.post("/CBOI/merchant/get-qr-string", {
        txnAmount,
        serialNo,
        vpa_id,
      });

      return res.data;
    } catch (err) {
      console.error("Dynamic QR API error:", err);
      throw err;
    }
  },

  fetchLanguages: async () => {
    try {
      const res = await apiAuth.get("/CBOI/isu_soundbox/lang/fetch_language");

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("Fetch Languages error:", err);
      throw err;
    }
  },

  fetchCurrentLanguage: async (tid) => {
    try {
      const res = await apiAuth.get(
        `/CBOI/isu_soundbox/user_api/current_language/${tid}`,
      );

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("Fetch Current Language error:", err);
      throw err;
    }
  },

  updateLanguage: async (payload) => {
    try {
      const encrypted = await encryptData(payload);

      const res = await apiAuth.post(
        "/CBOI/isu_soundbox/lang/update_language",
        {
          RequestData: encrypted,
        },
      );

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("Update Language error:", err);
      throw err;
    }
  },
};
