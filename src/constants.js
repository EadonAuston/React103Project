export const COMMERCEJS_URL = "https://api.chec.io/v1/products?include=description&limit=25";
export const COMMERCEJS_API = process.env.REACT_APP_COMMERCEJS_API;

export const headers = {
   "X-Authorization": `${COMMERCEJS_API}`,
   "Accept": "application/json",
   "Content-Type": "application/json",
};