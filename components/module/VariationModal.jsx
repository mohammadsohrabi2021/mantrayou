import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import { colorVariations } from '@/Data/DataColor';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { updateVariationSelectionMethod, updateQuantitySelectionMethod, resetVariationSelectionMethod } from "../../redux/appSlice";

const VariationModal = ({ open, onClose, variations, onSelect }) => {
  const dispatch = useDispatch();
  const selectedVariation = useSelector((state) => state.app.selectedVariation);
  const selectedQuantity = useSelector((state) => state.app.selectedQuantity);

  const handleSelectVariation = () => {
    onSelect({ variation: selectedVariation, quantity: selectedQuantity });
    dispatch(resetVariationSelectionMethod());
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" textAlign={'center'} fontFamily={'iran-sans'}>انتخاب تنوع</Typography>
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          value={selectedVariation}
          onChange={(e) => dispatch(updateVariationSelectionMethod({ variation: e.target.value }))}
        >
          {variations.map((variation, index) => (
            <FormControlLabel
              key={index}
              value={variation}
              control={<Radio />}
              sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%' }}
              label={
                <Box display="flex" alignItems="center" gap={2}>
                  {colorVariations[variation] && (
                    <Box 
                      sx={{
                        width: 26, 
                        height: 26, 
                        bgcolor: colorVariations[variation], 
                        borderRadius: '50%', 
                        display: 'inline-block', 
                        border: '1px solid gray'
                      }}
                    />
                  )}
                  <Typography fontFamily={'iran-sans'}>{variation}</Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
        <Box display="flex" alignItems="center" mt={2}>
          <IconButton onClick={() => dispatch(updateQuantitySelectionMethod({ quantity: Math.max(1, selectedQuantity - 1) }))}>
            <RemoveIcon />
          </IconButton>
          <Typography>{selectedQuantity}</Typography>
          <IconButton onClick={() => dispatch(updateQuantitySelectionMethod({ quantity: selectedQuantity + 1 }))}>
            <AddIcon />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions sx={{gap:2}}>
        <Button onClick={onClose} variant="outlined">لغو</Button>
        <Button onClick={handleSelectVariation} disabled={!selectedVariation} variant="contained" color="primary">
          اضافه کردن به سبد خرید
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VariationModal;
