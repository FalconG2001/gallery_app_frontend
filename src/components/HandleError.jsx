import { Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetError } from "../features/auth/authSlice";

export const ErrorHandler = ({ err }) => {
  const dispatch = useDispatch();
  return (
    <Alert
      severity="error"
      onClose={() => {
        dispatch(resetError());
      }}
    >
      <AlertTitle>
        {err.status} {err.statusText}
      </AlertTitle>
      {err.message}
    </Alert>
  );
};
