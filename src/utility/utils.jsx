import { apiService } from "../services/serviceApi";

export const getFormattedDate = (type) => {
  const d = new Date();

  if (type === "yesterday") {
    d.setDate(d.getDate() - 1);
  }

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

export const fetchReportData = async (vpa, dateFilter) => {
  try {
    const date = getFormattedDate(dateFilter);

    const payload = {
      startDate: date,
      endDate: date,
      vpa_id: vpa.vpa_id,
      mode: "both",
    };

    const res = await apiService.fetchReport(payload);

    const list = res?.data?.data || [];

    const totalAmount = list.reduce(
      (sum, item) => sum + (item.Transaction_Amount || 0),
      0
    );

    return {
      count: list.length,
      amount: totalAmount.toFixed(2),
      raw: list, 
    };
  } catch (err) {
    console.error("Report API error:", err);

    return {
      count: 0,
      amount: 0,
      raw: [],
    };
  }
};