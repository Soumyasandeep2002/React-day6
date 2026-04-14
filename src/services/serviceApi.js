import axios from "axios";
import { userManager } from "./authService";

const AUTH_BASE = "/auth-proxy";
const ENCR_BASE = "/encr-proxy";
const SERVICES_BASE = "https://services-cboi-uat.isupay.in/"

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
};