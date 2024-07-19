"use client";

import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

export const ToastProvider = ({ children, dataTestId }: any) => {
  const DismissAction = ({ id }: any) => {
    const { closeSnackbar } = useSnackbar();
    return (
      <button
        data-testid={dataTestId}
        type="button"
        onClick={() => closeSnackbar(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  };

  return (
    <SnackbarProvider
      action={(key) => <DismissAction id={key} dataTestId={key} />}
      autoHideDuration={3000}
      maxSnack={3}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {children}
    </SnackbarProvider>
  );
};
