import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DenseFilledTextField } from "../../../../Common/StyledComponents";
import { NoMarginHelperText } from "../../../Settings/Settings";

interface PathReplacement {
  from: string;
  to: string;
}

interface PathReplacementEditorProps {
  value?: PathReplacement[];
  onChange?: (value: PathReplacement[]) => void;
  helperText?: string;
}

const PathReplacementEditor = ({ value = [], onChange, helperText }: PathReplacementEditorProps) => {
  const { t } = useTranslation("dashboard");

  const handleAdd = useCallback(() => {
    const newValue = [...value, { from: "", to: "" }];
    onChange?.(newValue);
  }, [value, onChange]);

  const handleRemove = useCallback(
    (index: number) => {
      const newValue = value.filter((_, i) => i !== index);
      onChange?.(newValue);
    },
    [value, onChange],
  );

  const handleFromChange = useCallback(
    (index: number, newValue: string) => {
      const updated = [...value];
      updated[index] = { ...updated[index], from: newValue };
      onChange?.(updated);
    },
    [value, onChange],
  );

  const handleToChange = useCallback(
    (index: number, newValue: string) => {
      const updated = [...value];
      updated[index] = { ...updated[index], to: newValue };
      onChange?.(updated);
    },
    [value, onChange],
  );

  return (
    <Box>
      <Stack>
        {value.map((item, index) => (
          <Stack key={index} direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
            <DenseFilledTextField
              placeholder={t("policy.pathReplacementFrom")}
              size="small"
              value={item.from}
              onChange={(e) => handleFromChange(index, e.target.value)}
              sx={{ flex: 1 }}
            />
            <ArrowForwardIcon sx={{ fontSize: 20, color: "text.secondary" }} />
            <DenseFilledTextField
              placeholder={t("policy.pathReplacementTo")}
              size="small"
              value={item.to}
              onChange={(e) => handleToChange(index, e.target.value)}
              sx={{ flex: 1 }}
            />
            <IconButton size="small" onClick={() => handleRemove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={handleAdd} size="small" sx={{ mt: 1 }}>
        {t("policy.addPathReplacement")}
      </Button>
      {helperText && <NoMarginHelperText>{helperText}</NoMarginHelperText>}
    </Box>
  );
};

export default PathReplacementEditor;
