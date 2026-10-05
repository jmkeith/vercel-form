import { defineSlotRecipe } from "@chakra-ui/react";

export const formSummarySlotRecipe = defineSlotRecipe({
  className: "form-summary",
  slots: ["root", "title", "progress", "status", "empty", "list", "item", "question", "answer"],
  base: {
    root: { display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 },
    title: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      color: "ds.gray.1000",
    },
    progress: { fontSize: "13px", lineHeight: "18px", color: "ds.gray.900" },
    status: {
      padding: "8px 12px",
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.1000",
      backgroundColor: "ds.gray.100",
      borderRadius: "6px",
      "&[data-status=error]": { color: "ds.error" },
    },
    empty: { fontSize: "13px", lineHeight: "18px", color: "ds.gray.700" },
    list: {
      display: "flex",
      flexDirection: "column",
      margin: 0,
      "& > :not(:last-child)": { borderBottom: "1px dashed {colors.ds.grayAlpha.400}" },
    },
    item: { display: "flex", flexDirection: "column", gap: "4px", paddingBlock: "12px" },
    question: {
      lineClamp: 2,
      fontSize: "13px",
      lineHeight: "18px",
      color: "ds.gray.900",
      "& a": { color: "inherit", textDecoration: "none" },
    },
    answer: {
      margin: 0,
      fontSize: "14px",
      lineHeight: "20px",
      color: "ds.gray.1000",
      overflowWrap: "anywhere",
    },
  },
});
