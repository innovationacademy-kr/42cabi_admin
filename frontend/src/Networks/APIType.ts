import axios from "axios";

export function url(path: string) {
  return `${process.env.REACT_APP_API_SERVER}${path}`;
}

export function axiosFormat(option: Object, authorization: string | null) {
  return axios({
    ...option,
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
}
