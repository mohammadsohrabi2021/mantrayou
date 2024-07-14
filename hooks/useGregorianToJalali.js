import { useState, useEffect } from 'react';

const useBirthdayInfo = (dateInput) => {
  const [jalaliDateStr, setJalaliDateStr] = useState('');
  const [daysUntilBirthday, setDaysUntilBirthday] = useState(null);

  useEffect(() => {
    const gregorianToJalali = (g_y, g_m, g_d) => {
      var g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

      function div(a, b) {
        return ~~(a / b);
      }

      var gy = g_y - 1600;
      var gm = g_m - 1;
      var gd = g_d - 1;

      var g_day_no = 365 * gy + div(gy + 3, 4) - div(gy + 99, 100) + div(gy + 399, 400);

      for (var i = 0; i < gm; ++i)
        g_day_no += g_days_in_month[i];
      if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
        g_day_no++;
      g_day_no += gd;

      var j_day_no = g_day_no - 79;

      var j_np = div(j_day_no, 12053);
      j_day_no %= 12053;

      var jy = 979 + 33 * j_np + 4 * div(j_day_no, 1461);

      j_day_no %= 1461;

      if (j_day_no >= 366) {
        jy += div(j_day_no - 1, 365);
        j_day_no = (j_day_no - 1) % 365;
      }

      for (var j = 0; j < 11 && j_day_no >= j_days_in_month[j]; ++j)
        j_day_no -= j_days_in_month[j];
      var jm = j + 1;
      var jd = j_day_no + 1;

      return [jy, jm, jd];
    };

    const formatDateToUTCYYYYMMDD = (date) => {
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const day = date.getUTCDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const convertToJalali = (dateInput) => {
      let dateStr;

      if (dateInput instanceof Date) {
        dateStr = formatDateToUTCYYYYMMDD(dateInput);
      } else {
        dateStr = dateInput.split('T')[0];
      }

      const dateParts = dateStr.split('-');
      const g_y = parseInt(dateParts[0], 10);
      const g_m = parseInt(dateParts[1], 10);
      const g_d = parseInt(dateParts[2], 10);

      const [jy, jm, jd] = gregorianToJalali(g_y, g_m, g_d);
      return `${jy}-${jm.toString().padStart(2, '0')}-${jd.toString().padStart(2, '0')}`;
    };

    const calculateDaysUntilBirthday = (dateInput) => {
      const today = new Date();
      let birthDate;

      if (dateInput instanceof Date) {
        birthDate = new Date(Date.UTC(dateInput.getUTCFullYear(), dateInput.getUTCMonth(), dateInput.getUTCDate()));
      } else {
        birthDate = new Date(dateInput);
      }

      birthDate.setUTCFullYear(today.getUTCFullYear());

      if (birthDate < today) {
        birthDate.setUTCFullYear(today.getUTCFullYear() + 1);
      }

      const diffTime = Math.abs(birthDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    setJalaliDateStr(convertToJalali(dateInput));
    setDaysUntilBirthday(calculateDaysUntilBirthday(dateInput));
  }, [dateInput]);

  return { jalaliDateStr, daysUntilBirthday };
};

export default useBirthdayInfo;
