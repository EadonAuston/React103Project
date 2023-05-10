import { COMMERCEJS_API, COMMERCEJS_URL, headers }  from "./constants";

// class WeatherService {
//    async fetchFiveDayForecast(zip) {
//       return new Promise(async (success, failure) => {
//          try {
//             const response = await fetch(`${WEATHER_URL}&zip=${zip}&appid=${WEATHER_API}`);
//             if (response.ok) {
//                const json = await response.json();
//                const data = json.list
//                .filter(day => day.dt_txt.includes("00:00:00"))
//                .map(item => ({
//                   temp: item.main.temp,
//                   feelsLike: item.main.feels_like,
//                   humidity: item.main.humidity,
//                   windSpeed: item.wind.speed,
//                   dt: item.dt,
//                   date: item.dt_txt,
//                   imgId: item.weather[0].id,
//                   desc: item.weather[0].description,
//                }));
//                success({ response, data })
//             } else {
//                failure({error: "Invalid HTTP request"})
//             }
//          } catch(error) {
//             failure(error);
//          }
//       })
//    }
// }

// export default WeatherService;



class CommerceService {
   async fetchStoreProducts() {
      return new Promise( async (success, failure) => {
         try {
            const response = await fetch(`${COMMERCEJS_URL}`, {
               method: "GET",
               headers: headers,
            });
            if (response.ok) {
               const json = await response.json();
               const data = json.data.map((item) => ({
                  img: item.image.url,
                  category: item.categories[0].name,
                  desc: item.description,
                  id: item.id,
                  leftInStock: item.inventory.available,
                  name: item.name,
                  price: item.price.formatted,
                  qty: 0,


               }));
               console.log(data);
               success({ response, data })
            } else {
               failure({error: "Invalid HTTP request"})
            }
         } catch(error) {
            failure(error);
         }
      })
   }
}

export default CommerceService;
// const url = new URL(
//    "https://api.chec.io/v1/assets"
// );

// const headers = {
//    "X-Authorization": "sk_514747337cc3e9fa8ebd6e7b43398d90c95159d6cab3c",
//    "Accept": "application/json",
//    "Content-Type": "application/json",
// };

// fetch(url, {
//    method: "GET",
//    headers: headers,
// })
//    .then(response => response.json());
// }