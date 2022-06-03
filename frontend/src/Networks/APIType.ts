import axios from "axios";

export function url(path: string) {
  return `http://localhost:8080${path}`;
}

export function axiosFormat(option: Object, authorization: string | null) {
  return axios({
    ...option,
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
}
