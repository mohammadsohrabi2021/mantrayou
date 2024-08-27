import React from 'react';
import { Tabs, Tab } from '@mui/material';

function FilterCategoryId({ filter, setFilter, setPage }) {
  const handleFilterChange = (event, newValue) => {
    setFilter(newValue);
    setPage(1);  // ریست کردن صفحه به 1 وقتی فیلتر تغییر می‌کند
  };

  return (
    <Tabs value={filter} onChange={handleFilterChange}    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    className="box-shadow"
    sx={{ padding: 2, marginTop: {xs:3,sm:0}, borderRadius: 2 }} aria-label="filter tabs example">
      <Tab label="پرفروش‌ترین‌ها"sx={{fontFamily:'iran-sans'}} value="bestsellers" />
      <Tab label="ترندها"sx={{fontFamily:'iran-sans'}} value="trends" />
      <Tab label="قیمت صعودی"sx={{fontFamily:'iran-sans'}} value="price_ascending" />
      <Tab label="قیمت نزولی"sx={{fontFamily:'iran-sans'}} value="price_descending" />
      <Tab label="محبوب‌ترین‌ها"sx={{fontFamily:'iran-sans'}} value="most_liked" />
    </Tabs>
  );
}

export default FilterCategoryId;
