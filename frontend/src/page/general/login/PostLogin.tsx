import { constant } from "../../../constants";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useAppDispatch } from "@redux/hooks";
import {
  postLoginCallback,
  setAccessToken,
} from "@redux/slices/authentication.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";

export const PostLogin = () => {
  const { instance, accounts, inProgress } = useMsal();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (accounts[0]) {
      instance.setActiveAccount(accounts[0]);

      instance
        .acquireTokenSilent({
          ...constant.authentication.loginRequest,
          account: accounts[0],
        })
        .then((result) => {
          dispatch(setAccessToken(result.accessToken));
          dispatch(postLoginCallback())
            .then(unwrapResult)
            .then(() => {
              window.location.href = "/";
            })
            .catch((err) => {
              dispatch(showMessageDialog(err));
            });
        })
        .catch((err) => {
          console.log(err);
          dispatch(showMessageDialog(err));
        });
    }
  }, [inProgress, instance, accounts, dispatch]);

  return <></>;
};
