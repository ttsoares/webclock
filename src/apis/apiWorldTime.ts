export default async function getTime() {
  const res = await fetch("/api/time");
  const data = await res.json();
  return data;
}

/*
  {
  "utc_offset":"-03:00",
  "timezone":"America/Sao_Paulo",
  "day_of_week":2,
  "day_of_year":210,
  "datetime":"2025-07-29T07:48:54.096843-03:00",
  "utc_datetime":"2025-07-29T10:48:54.096843+00:00",
  "unixtime":1753786134,
  "raw_offset":-10800,
  "week_number":31,
  "dst":false,
  "abbreviation":"-03",
  "dst_offset":0,
  "dst_from":null,
  "dst_until":null,
  "client_ip":"45.167.105.220"
  }
*/
