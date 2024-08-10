
import { getDataCheckOutUser } from "@/pages/api/checkout/checkoutApi";
import { saveCheckoutInfoMethod } from "@/redux/appSlice";
import Cookies from "js-cookie";

export const fetchData = async (dispatch, setLoading) => {
  const token = Cookies.get("token");
  try {
    const data = await getDataCheckOutUser(token);
    dispatch(saveCheckoutInfoMethod(data)); // فرض بر این است که API داده‌های سبد خرید را برمی‌گرداند
    setLoading(false); // پایان لودینگ
  } catch (error) {
    console.error("Error fetching data:", error);
    setLoading(false); // پایان لودینگ حتی در صورت بروز خطا
  }
};
