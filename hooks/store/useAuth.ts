"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { AuthState, setAuth } from "@/store/slices/authSlice";
import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";

export const useAuth = () => {
  const { user, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );

  const loginApi = async () => {
    const response = await axiosClient.post("/auth/login");
    return response.data;
  };

  const { mutate: loginMutate } = useMutation({
    mutationFn: () => loginApi(),
    onSuccess: (data) => {
      setAuthInfo(data.user, data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const logoutApi = async () => {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
  };

  const { mutate: logoutMutate } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      dispatch(setAuth({ user: null, accessToken: "", refreshToken: "" }));
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const dispatch = useDispatch();
  const setAuthInfo = (user: AuthState["user"], accessToken: string, refreshToken: string) => {
    dispatch(setAuth({ user, accessToken, refreshToken }));
  };



  return { user, accessToken, refreshToken, setAuthInfo, logout:logoutMutate, login:loginMutate };
};