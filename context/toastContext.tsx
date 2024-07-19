"use client";

import { useSnackbar } from "notistack";

export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (
    text: string,
    variant: "error" | "info" | "warning" | "success"
  ) =>
    enqueueSnackbar(text, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });

  return showToast;
};
