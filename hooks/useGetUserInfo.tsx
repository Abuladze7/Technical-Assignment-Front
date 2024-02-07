import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState<any>();
  const [userLoading, setUserInfoLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userInfo && Cookies.get("_userInfo")) {
      setUserInfo(Cookies.get("_userInfo"));
      setUserInfoLoading(false);
    } else {
      setUserInfoLoading(false);
    }
  }, []);

  return {
    userLoading,
    userInfo,
  };
};

export default useGetUserInfo;
