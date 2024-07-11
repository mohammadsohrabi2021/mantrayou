import React, { useEffect } from "react";
import { getAllProducts } from "./api/homePage/homePageApi";
import { saveProductsInfoMethod } from "@/redux/appSlice";
import { useDispatch } from "react-redux";
import HomePage from "@/components/template/HomePage";
function Home({ initialProducts }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveProductsInfoMethod(initialProducts));
  }, [dispatch, initialProducts]);

  return <HomePage initialProducts={initialProducts} />;
}

export const getStaticProps = async () => {
  try {
    const products = await getAllProducts(20, 1); // Provide default values or appropriate values
    return {
      props: { initialProducts: products },
      revalidate: 3600, // Revalidate every hour (3600 seconds)
    };
  } catch (error) {
    console.error("Failed to fetch products", error);
    return {
      props: { initialProducts: [] },
    };
  }
};

export default Home;
