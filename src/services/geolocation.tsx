import axios from "axios";

const baseURL = "http://api.bigdatacloud.net/data/";

const timeout = 20000;

const headers = new Headers();
headers.append("Content-Type", "application/json");

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
});

export const getReverseGeocode = (
  latitude: any,
  longitude: any,
  callbackSuccess?: Function,
  callbackError?: Function
) => {
  const action = `reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;

  const method = "get";

  console.log("execute Call:", baseURL + action, "method:", method);

  axiosInstance
    .request({
      url: action,
      method: method,
    })
    .then((response) => {
      console.log("status", response.status, response.data);
      if (callbackSuccess) {
        return callbackSuccess(response.data);
      } else {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
      if (callbackError) {
        return callbackError(error);
      }
    });
};
