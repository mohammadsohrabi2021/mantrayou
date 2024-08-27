import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isCheckoutShipping = router.pathname === "/checkout"|| router.pathname === "/checkout/payment"|| router.pathname === "/payment/results/failure"|| router.pathname === "/payment/results/success";
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "auto", fontSize: "16px" }}
      />

      {isCheckoutShipping ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}
