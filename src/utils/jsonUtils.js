export const parseSkyscannerFlights = data => {
  let parsedFlights = [];

  data.Itineraries.forEach(itinerary => {
    const legId = itinerary.OutboundLegId;

    // Find a matching leg for the itinirary to match a carrier and price
    const matchingLeg = data.Legs.find(leg => {
      return leg.Id === legId && leg.Stops.length === 0;
    });

    if (matchingLeg) {
      const carrierId = matchingLeg.Carriers[0];
      const price = itinerary.PricingOptions[0].Price;
      const url = itinerary.PricingOptions[0].DeeplinkUrl;
      let flightNumber = matchingLeg.FlightNumbers[0].FlightNumber;
      let arrivalTime = formatFlightTime(matchingLeg.Arrival);
      let departureTime = formatFlightTime(matchingLeg.Departure);
      //const arrivalDayDiff = new Date(arrivalTime) - new Date(departureTime)

      //Find mathing carrier to build the flight number
      const matchingCarrier = data.Carriers.find(carrier => {
        return carrier.Id === carrierId;
      });

      // Build flight number if carrier was found
      if (matchingCarrier) {
        flightNumber = matchingCarrier.Code + flightNumber;
      }

      parsedFlights.push({
        legId,
        flightNumber,
        price,
        url,
        arrivalTime,
        departureTime
      });
    }
  });

  return parsedFlights;
};

export const mergeFlightResults = (skyscannerFlights, allFlights, currency) => {
  if (currency === "USD") {
    currency = "$";
  } else if (currency === "EUR") {
    currency = "€";
  } else if (currency === "GBP") {
    currency = "£";
  } else {
    currency = "$";
  }

  skyscannerFlights.forEach(skyscannerFlight => {
    let matchedFlight = allFlights.find(flight => {
      return flight.flightNumber === skyscannerFlight.flightNumber;
    });

    if (matchedFlight) {
      matchedFlight.price = `${currency}${Math.round(skyscannerFlight.price)}`;
      matchedFlight.url = skyscannerFlight.url;
      matchedFlight.arrivalTime = skyscannerFlight.arrivalTime;
      matchedFlight.departureTime = skyscannerFlight.departureTime;
    }
  });

  return allFlights;
};

const formatFlightTime = dateString => {
  let date = new Date(dateString);
  let minutes = date.getMinutes();
  let hours = date.getHours();
  minutes = minutes.toString();
  hours = hours.toString();
  minutes = minutes.length > 1 ? minutes : `0${minutes}`;
  hours = hours.length > 1 ? hours : `0${hours}`;
  return `${hours}:${minutes}`;
};
