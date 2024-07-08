import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const handleLogout = (router,firstName,lastName) => {
  Cookies.remove("token");
  toast.success(
    `${firstName} ${lastName} عزیز شما با موفقیت از اکاانت کاربری خود خارج شدید به امید دیدار مجدد شما`
  );
  router.push("/login");
};
