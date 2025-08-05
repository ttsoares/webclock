export default async function getLocation() {
  const res = await fetch("/api/location");
  const data = await res.json();
  return data;
}

/*
{
  "ip": "168.232.7.156",
  "hostname": "168-232-7-156.shellnet.net.br",
  "city": "Sapiranga",
  "region": "Rio Grande do Sul",
  "country": "BR",
  "loc": "-29.6381,-51.0069",
  "org": "AS264920 Shel Net Informatica Ltda",
  "postal": "93800-000",
  "timezone": "America/Sao_Paulo"
}
*/
