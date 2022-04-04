import * as axios from "axios";

export default class Item {

  constructor() {
    this.items = null;
    this.api_url = process.env.REACT_APP_API_ENDPOINT;
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };

    this.items = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    console.log(this.api_url);

    return this.items;
  };

  // getProductList = (params) => {
  //   return this.init().get("/products", { params: params });
  // };
}