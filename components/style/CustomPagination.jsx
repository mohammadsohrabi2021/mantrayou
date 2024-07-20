// components/common/CustomPagination.js
import { styled } from '@mui/system';
import Pagination from '@mui/material/Pagination';

const CustomPagination = styled(Pagination)`
  & .MuiPaginationItem-root {
    color: #1976d2; /* رنگ دلخواه برای آیتم‌ها */
    &:hover {
      background-color: rgba(25, 118, 210, 0.08); /* رنگ پس‌زمینه دلخواه برای هاور */
    }
    &.Mui-selected {
      background-color: #1976d2; /* رنگ پس‌زمینه دلخواه برای آیتم‌های انتخاب شده */
      color: #fff; /* رنگ متن دلخواه برای آیتم‌های انتخاب شده */
      &:hover {
        background-color: #115293; /* رنگ پس‌زمینه دلخواه برای هاور آیتم‌های انتخاب شده */
      }
    }
  }

  & .MuiPaginationItem-previousNext {
    transform: rotate(180deg); /* چرخش علامت‌ها */
  }
`;

export default CustomPagination;
