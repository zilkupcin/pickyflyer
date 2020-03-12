import Parse from "parse";

export const fetchFlightsByQuery = async queryParams => {
  return await Parse.Cloud.run("fetchFlightsByQuery", queryParams);
};

export const getFlightCountByQuery = async queryParams => {
  return await Parse.Cloud.run("getFlightCountByQuery", queryParams);
};

export const getFlightCountByAircraft = async queryParams => {
  return await Parse.Cloud.run("getFlightCountByAircraft", queryParams);
};

export const fetchFlightsByAircraft = async queryParams => {
  return await Parse.Cloud.run("fetchFlightsByAircraft", queryParams);
};

export const sendInquiry = async params => {
  return await Parse.Cloud.run("sendInquiry", params);
};

export const fetchAllAircraft = async () => {
  return await Parse.Cloud.run("fetchAllAircraft");
};

export const fetchAircraftByQuery = async queryParams => {
  return await Parse.Cloud.run("fetchAircraftByQuery", queryParams);
};
