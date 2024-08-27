import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { fetchCategory } from "../api/mune/muneApi";
import FilterCategoryId from "@/components/module/FilterCategoryId";
import ProductsCategoryPage from "@/components/template/ProductsCategoryPage";

function CategoryId() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState("bestsellers");
  const [page, setPage] = useState(1);
  const [categoryPath, setCategoryPath] = useState("");
  const router = useRouter();
  const categoryId = router.query.categoryId;

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId)
        .then((data) => {
          if (data && Array.isArray(data) && data.length > 0) {
            setCategories(data);
            setSelectedCategory(categoryId); // استفاده از دسته‌بندی از URL
          }
        })
        .catch((err) => {
          console.error("Fetching error:", err);
        });
    }
  }, [categoryId]);

  const handleCategorySelect = (itemId, name) => {
    setSelectedCategory(itemId);
    setPage(1);
    // به‌روزرسانی مسیر دسته‌بندی
    setCategoryPath(name);
    // به‌روزرسانی URL با شناسه دسته‌بندی جدید
    router.push({
      pathname: router.pathname,
      query: { ...router.query, categoryId: itemId },
    });
  };

  if (!categories.length) return <p>دسته‌بندی‌ای موجود نیست</p>;

  console.log(categories)
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        direction: "rtl",
        textAlign: "right",
      }}
      flexDirection={{xs:'column',sm:'row'}}
    >
      <Box width={{xs:'100%',sm:'20%'}}  sx={{  borderRight: "1px solid #ddd", padding: 2 }}>
        <SimpleTreeView
          aria-label="دسته‌بندی‌ها"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ direction: "ltr" }}
        >
          {categories.map((category) => (
            <TreeItem
              key={category.id}
              itemId={category.id}
              label={
                <span
                  onClick={() => handleCategorySelect(category.id, category.category_path)}
                  style={{ cursor: "pointer" }}
                >
                  {category.name}
                </span>
              }
            >
              {Array.isArray(category.childs) && category.childs.length > 0
                ? category.childs.map((node) => (
                    <TreeItem
                      key={node.id}
                      itemId={node.id}
                      label={
                        <span
                          onClick={() =>
                            handleCategorySelect(node.id, node.category_path)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {node.name}
                        </span>
                      }
                    />
                  ))
                : null}
            </TreeItem>
          ))}
        </SimpleTreeView>
      </Box>

      <Box p={{xs:0,sm:2}} width={{xs:'100%',sm:'80%'}}>
        <FilterCategoryId
          filter={filter}
          setFilter={setFilter}
          setPage={setPage}
        />
        <ProductsCategoryPage
          selectedCategory={selectedCategory}
          filter={filter}
          page={page}
          setPage={setPage}
        />
      </Box>
    </Box>
  );
}

export default CategoryId;
