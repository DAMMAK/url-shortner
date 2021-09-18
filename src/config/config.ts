import * as dotenv from "dotenv";
dotenv.config();
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log("BASE URL =>", BASE_URL);

export { BASE_URL };
