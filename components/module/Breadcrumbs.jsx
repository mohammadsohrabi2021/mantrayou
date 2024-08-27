import { fetchCategoryInfo } from "@/pages/api/mune/muneApi";
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
  "/contact-us": "تماس با ما",
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
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    if (router.query.productId && router.pathname.includes("/products/")) {
      const product = products.find((p) => p.id == router.query.productId);

      if (product) {
        setProductName(product.name);
      }
    }
  }, [router.query.productId, router.pathname, products]);

  useEffect(() => {
    const fetchCategory = async (categoryId) => {
      try {
        const data = await fetchCategoryInfo(categoryId);
        return data.category_info;
      } catch (error) {
        console.error("Error fetching category info:", error);
      }
    };

    const buildBreadcrumb = async (categoryId) => {
      const breadcrumb = [];
      let currentCategoryId = categoryId;

      while (currentCategoryId) {
        const categoryInfo = await fetchCategory(currentCategoryId);
        if (!categoryInfo) break;
        
        breadcrumb.unshift({
          name: categoryInfo.name,
          id: categoryInfo._id,
          parentId: categoryInfo.parent_id,
          parentName: categoryInfo.parent_name,
        });
        
        currentCategoryId = categoryInfo.parent_id;
      }

      setBreadcrumbItems(breadcrumb);
    };

    if (router.query.categoryId) {
      buildBreadcrumb(router.query.categoryId);
    }
  }, [router.query.categoryId]);

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
        let to = `/${pathnames.slice(0, index + 1).join("/")}`;

        let breadcrumbName = breadcrumbNameMap[to];

        if (to.startsWith("/products/") && productName) {
          breadcrumbName = productName;
          to = `/products/${router.query.productId}`;
        }

        if (to.startsWith("/productsCategorization/") && breadcrumbItems.length > 0) {
          breadcrumbName = breadcrumbItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Link
                underline="hover"
                href={`/productsCategorization/${item.id}`}
                style={{
                  color: "lightGray",
                  fontFamily: "iran-sans",
                  fontSize: "12px",
                }}
              >
                {item.name}
              </Link>
              {idx < breadcrumbItems.length - 1 && " / "}
            </React.Fragment>
          ));
          to = `/productsCategorization/${breadcrumbItems[breadcrumbItems.length - 1].id}`;
        }

        return last ? (
          <Typography
            color="lightGray"
            key={to}
            fontFamily={"iran-sans"}
            fontSize="12px"
          >
            {breadcrumbName || value}
          </Typography>
        ) : (
          <Link
            underline="hover"
            href={to}
            key={to}
            style={{
              color: "lightGray",
              fontFamily: "iran-sans",
              fontSize: "12px",
            }}
          >
            {breadcrumbName || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
