"use client";

import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type NotificationSeverity = "success" | "error";

interface NotificationState {
  message: string;
  severity: NotificationSeverity;
}

let notifyHandler: ((notification: NotificationState) => void) | null = null;

export const showNotification = (notification: NotificationState) => {
  notifyHandler?.(notification);
};

const AppSnackbar = () => {
  const [notification, setNotification] =
    React.useState<NotificationState | null>(null);

  React.useEffect(() => {
    notifyHandler = setNotification;

    return () => {
      notifyHandler = null;
    };
  }, []);

  return (
    <Snackbar
      open={Boolean(notification)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={() => setNotification(null)}
    >
      <Alert
        severity={notification?.severity ?? "success"}
        variant="filled"
        onClose={() => setNotification(null)}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
