import axios, { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";

export function url(path: string) {
  return `${window.location.origin}${path}`;
}

export function axiosFormat(option: Object, authorization: string | null) {
  return axios({
    ...option,
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
}

export function HandleError(
  navigate: NavigateFunction,
  axiosError: AxiosError,
  dest?: string,
  errorType?: string
) {
  if (axiosError.response?.status === 401) {
    // Authorization Error
    localStorage.removeItem("accessToken");
    navigate("/");
  } else if (
    axiosError.response?.status === 500 ||
    axiosError.response?.status === 400
  ) {
    // DB Error
    navigate("/saerom/search/invalidSearchResult", {
      state: {
        errorType: "Input",
      },
    });
  } else if (dest !== undefined && errorType !== undefined) {
    navigate(dest, {
      state: {
        errorType: errorType,
      },
    });
  }
}

export type axiosError = AxiosError;
