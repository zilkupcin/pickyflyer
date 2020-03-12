import { parseSkyscannerFlights } from "../utils/jsonUtils";

const requestHeaders = {
  "X-RapidAPI-Host": process.env.REACT_APP_SKYSCANNER_HOST,
  "X-RapidAPI-Key": process.env.REACT_APP_SKYSCANNER_API_KEY,
  "content-type": "application/x-www-form-urlencoded"
};

export const createSkyscannerSession = async (
  currency,
  origin,
  destination,
  outboundDate
) => {
  //REQUIRED BY API: Add '-sky' at the end of origin and destination
  origin = origin + "-sky";
  destination = destination + "-sky";

  const body = `country=US&currency=${currency}&locale=en-US&originPlace=${origin}&destinationPlace=${destination}&outboundDate=${outboundDate}&adults=1`;

  const response = await fetch(
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0",
    {
      method: "POST",
      headers: requestHeaders,
      body: body
    }
  );

  return response.headers.get("location").split("/")[7];
};

export const querySession = async (sessionKey, page) => {
  const requestUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/%7B${sessionKey}%7D?pageIndex=${page}&pageSize=20&stops=0`;

  const response = await fetch(requestUrl, {
    method: "GET",
    headers: requestHeaders
  });

  const jsonData = await response.json();

  return parseSkyscannerFlights(jsonData);
};
