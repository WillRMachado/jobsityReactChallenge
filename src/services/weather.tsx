import axios from "axios";

const baseURL = "http://api.openweathermap.org/data/";

const timeout = 20000;

const headers = new Headers();
headers.append("Content-Type", "application/json");

const axiosInstance = axios.create({
  baseURL,
  timeout,
  headers,
});

export const getWeatherIconCity = (
  cityName: any,
  callbackSuccess?: Function,
  callbackError?: Function
) => {
  const action = `2.5/weather?APPID=41199325ac019fe469c0ed52b3e63b2c&q=${cityName}`;

  const method = "get";

  console.log("execute Call:", baseURL + action, "method:", method);

  axiosInstance
    .request({
      url: action,
      method: method,
    })
    .then((response) => {
      console.log("status", response.status, response.data);
      if (callbackSuccess && response.data.weather[0].icon !== undefined) {
        const iconLink = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        return callbackSuccess(iconLink);
      } else {
        return response.data.weather[0].icon;
      }
    })
    .catch((error) => {
      console.log(error);
      if (callbackError) {
        return callbackError(error);
      }
    });
};
