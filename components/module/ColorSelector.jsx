import React from 'react';
import { Box, IconButton, Typography } from "@mui/material";
import { colorVariations } from '@/Data/DataColor'; // Import your color variations
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";

// Function to get contrasting color
const getContrastingColor = (hex) => {
  // Convert hex to RGB
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const ColorSelector = ({ colors, selectedColor, onColorSelect, quantity, onQuantityChange }) => {
  return (
    <Box>
      <Typography variant="h6">انتخاب رنگ:</Typography>
      <Box display="flex" flexDirection="row" gap={2} mt={2}>
        {colors.map((color, index) => (
          <Box key={index} onClick={() => onColorSelect(color)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center',gap:2 }}>
            <Box sx={{ width: 26, height: 26, bgcolor: colorVariations[color], borderRadius: '50%', border: selectedColor === color ? '2px solid #000' : '1px solid gray', position: 'relative', marginRight: 1 }}>
              {selectedColor === color && (
                <CheckIcon 
                  sx={{ 
                    color: color === 'سفید' ? '#000' : getContrastingColor(colorVariations[color]), 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)' 
                  }} 
                />
              )}
            </Box>
            <Typography fontFamily={'iran-sans'}>{color}</Typography>
          </Box>
        ))}
      </Box>
      {selectedColor && (
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton onClick={() => onQuantityChange(quantity + 1)}>
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ColorSelector;
