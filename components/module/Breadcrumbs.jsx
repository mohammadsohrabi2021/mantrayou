import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const breadcrumbNameMap = {
  "/": "خانه",
  "/login": "ورود",
  "/Register":"ثبت نام",
  "/profile": "پروفایل",
  "/products": "محصولات",
  "/productsCategorization": "دسته‌بندی محصولات",
  "/brands": "برندها",
  "/contact-us": "تماس با ما ",
  "/blog": "وبلاگ",
  "/about-us": "درباره ما",
  "/FrequentlyAskedQuestions": "سوالات متداول",
  "/dashboard":"داشبورد مدیریت"
};

const CustomBreadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" href="/" style={{fontFamily:'iran-sans',color:'lightGray',fontSize:'12px'}}>
        فروشگاه
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return last ? (
          <Typography color="lightGray" key={to} fontFamily={'iran-sans'}fontSize='12px'>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link underline="hover" color="lightGray" href={to} key={to}>
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
