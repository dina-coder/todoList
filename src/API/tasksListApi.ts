import axios, { AxiosResponse } from "axios";
import listData from "./tasksList.json";

var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

mock.onGet("/tasksList").reply(200, {
  tasks: listData,
});

export const ApiTasks = {
  getTasksList() {
    return axios
      .get("/tasksList")
      .then((response: AxiosResponse<TResponse>) => {
        return response.data.tasks;
      });
  },
};
