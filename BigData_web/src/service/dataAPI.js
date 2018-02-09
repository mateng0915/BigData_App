import axios from 'axios'
import {URLS} from '../utils/ConstStore'

export const fetchData = function () {
       
  return axios.get(URLS.dataURL)
    .then((response) => {
      if (response.status === 200 && response.data.status === "success") {
        return response.data;
      } else {
        return false;
      }
    });
}
