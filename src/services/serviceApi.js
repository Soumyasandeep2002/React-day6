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

export async function decryptData(cipher) {
  const res = await apiEncr.post(
    "/decr",
    { req: cipher },
    { headers: { Key: ENCR_KEY } },
  );

  return res.data;
}

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      // remove metadata like "data:application/pdf;base64,"
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };

    reader.onerror = (error) => reject(error);
  });
};

export const apiService = {
  fetchUserById: async (params) => {
    const encrypted = await encryptData(params);

    const res = await apiAuth.post("/CBOI/fetch/fetchById", {
      RequestData: encrypted,
    });

    const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

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

  filterTickets: async (payload) => {
    try {
      const encrypted = await encryptData(payload);

      const res = await apiAuth.post("/CBOI/zendesk/v2/filterTickets", {
        RequestData: encrypted,
      });

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("Filter Tickets error:", err);
      throw err;
    }
  },
  viewTicket: async (payload) => {
    try {
      const encrypted = await encryptData(payload);

      const res = await apiAuth.post("/CBOI/zendesk/v2/viewTicket", {
        RequestData: encrypted,
      });

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("View Ticket error:", err);
      throw err;
    }
  },

  showComment: async (payload) => {
    try {
      const encrypted = await encryptData(payload);

      const res = await apiAuth.post("/CBOI/zendesk/v2/showComment", {
        RequestData: encrypted,
      });

      const cipher = res.data?.data || res.data?.Data || res.data?.ResponseData;

      const decrypted = await decryptData(cipher);

      return decrypted;
    } catch (err) {
      console.error("Show Comment error:", err);
      throw err;
    }
  },

  downloadTicket: async ({ ticket_id, user_name }) => {
    try {
      const res = await apiServices.get("/CBOI/zendesk/v2/downloadByID", {
        params: {
          ticket_id,
          user_name,
        },
        responseType: "blob",
      });

      return res.data;
    } catch (err) {
      console.error("Download Ticket error:", err);
      throw err;
    }
  },

  fetchZendeskForm: async () => {
    try {
      const payload = {
        index: "zendesk_form",
        type: "em",
        query: {
          query: {
            nested: {
              path: "forms",
              query: {
                bool: {
                  must: [
                    {
                      match: {
                        "forms.id": 47501075391257,
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      };

      const res = await axios.post(
        "https://services.txninfra.com/isu/elastic/fetch",
        payload,
      );

      return res.data;
    } catch (err) {
      console.error("Fetch Zendesk Form error:", err);
      throw err;
    }
  },

  uploadFiles: async (files) => {
  try {
    // 🔥 convert all files to base64 here
    const filesWithBase64 = await Promise.all(
      files.map(async (f) => ({
        base64string: await fileToBase64(f.file), // 👈 convert here
        filename: f.filename,
      }))
    );

    const payload = {
      files: filesWithBase64,
    };

    const encrypted = await encryptData(payload);

    const res = await apiAuth.post(
      "/CBOI/zendesk/v2/uploadFile",
      {
        RequestData: encrypted,
      }
    );

    const cipher =
      res.data?.data || res.data?.Data || res.data?.ResponseData;

    const decrypted = await decryptData(cipher);

    return decrypted;
  } catch (err) {
    console.error("Upload File error:", err);
    throw err;
  }
},
createTicket: async (payload) => {
  try {
    const encrypted = await encryptData(payload);

    const res = await apiAuth.post(
      "/CBOI/zendesk/v2/createTicket",
      {
        RequestData: encrypted,
      }
    );

    const cipher =
      res.data?.data || res.data?.Data || res.data?.ResponseData;

    const decrypted = await decryptData(cipher);

    return decrypted;
  } catch (err) {
    console.error("Create Ticket error:", err);
    throw err;
  }
},
};
