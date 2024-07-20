import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const breadcrumbNameMap = {
  "/": "خانه",
  "/login": "ورود",
  "/Register": "ثبت نام",
  "/profile": "پروفایل",
  "/products": "محصولات",
  "/productsCategorization": "دسته‌بندی محصولات",
  "/brands": "برندها",
  "/contact-us": "تماس با ما ",
  "/blog": "وبلاگ",
  "/about-us": "درباره ما",
  "/FrequentlyAskedQuestions": "سوالات متداول",
  "/dashboard": "داشبورد مدیریت",
};

const CustomBreadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);
  const products = useSelector((state) => state.app.products);
  const [productName, setProductName] = useState("");

  useEffect(() => {
    if (router.query.productId && router.pathname.includes("/products/")) {
      const product = products.find((p) => p.id == router.query.productId);

      if (product) {
        setProductName(product.name);
      }
    }
  }, [router.query.productId, router.pathname, products]);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        href="/"
        style={{
          fontFamily: "iran-sans",
          color: "lightGray",
          fontSize: "12px",
        }}
      >
        فروشگاه
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        let breadcrumbName = breadcrumbNameMap[to];
        if (to.startsWith("/products/") && productName && last) {
          breadcrumbName = productName;
        }

        return last ? (
          <Typography
            color="lightGray"
            key={to}
            fontFamily={"iran-sans"}
            fontSize="12px"
          >
            {breadcrumbName}
          </Typography>
        ) : (
          <Link
            underline="hover"
            style={{
              color: "lightGray",
              fontFamily: "iran-sans",
              fontSize: "12px",
            }}
            href={to}
            key={to}
          >
            {breadcrumbNameMap[to] || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
