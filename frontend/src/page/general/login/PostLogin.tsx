import { useEffect } from "react";
import { constant } from "@main/constants";
import { useMsal } from "@azure/msal-react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  postLoginCallback,
  selectRedirectUrl,
  setAccessToken,
} from "@redux/slices/authentication.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { setCurrentSetting } from "@main/features/slices/setting.slice";
import MainNavBar from "@main/components/navbar/MainNavBar";
import Loading from "@main/components/loading/Loading";

const PostLogin = () => {
  const { instance, accounts } = useMsal();

  const dispatch = useAppDispatch();

  const redirectUrl = useAppSelector(selectRedirectUrl)

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
            .then((user) => {
              window.location.href = redirectUrl;
              dispatch(setCurrentSetting(user.currentSetting));
            })
            .catch((err) => {
              dispatch(showMessageDialog(err));
            });
        })
        .catch((err) => {
          dispatch(showMessageDialog(err));
        });
    }
  }, [instance, redirectUrl, accounts, dispatch]);

  return (
    <>
      <MainNavBar />
      <Loading />
    </>
  );
};

export default PostLogin;
