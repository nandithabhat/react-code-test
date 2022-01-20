import axios from "axios";

const baseURL = "http://localhost:9001/api";


export const getPayments= async(pageIndex) => {

const response = await axios.get(`${baseURL}/payments?pagelndex=${pageIndex}`);
if (response) {
    return response;
  }

}
