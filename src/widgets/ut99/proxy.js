import { pingWithPromise } from "minecraft-ping-js";

import createLogger from "utils/logger";
import getServiceWidget from "utils/config/service-helpers";

const proxyName = "minecraftProxyHandler";

const logger = createLogger(proxyName);

export default async function minecraftProxyHandler(req, res) {
  const { group, service } = req.query;
  const serviceWidget = await getServiceWidget(group, service);
  const url = new URL(serviceWidget.url);

const myRequest = new Request("192.168.1.233:7778" , {
	method: "POST",
	body: JSON.stringify("\\info\\"),
});
const response = await fetch(myRequest);
console.log(response);

  try {
    const pingResponse = await pingWithPromise(url.hostname, url.port || 25565);
      console.log(pingResponse)
      res.status(200).send({
      version: pingResponse.version.name,
      online: true,
      players: pingResponse.players,
    });
  } catch (e) {
    if (e) logger.error(e);
    res.status(200).send({
      version: undefined,
      online: false,
      players: undefined,
    });
  }
}
