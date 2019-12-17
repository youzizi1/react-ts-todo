import originAxios from "axios";

const axios = originAxios.create();

axios.interceptors.response.use(
  res => res.data,
  err => console.log(err, "网络错误")
);

export default originAxios;
