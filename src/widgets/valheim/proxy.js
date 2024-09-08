import { pingWithPromise } from "minecraft-ping-js";

import createLogger from "utils/logger";
import getServiceWidget from "utils/config/service-helpers";

const proxyName = "minecraftProxyHandler";
const logger = createLogger(proxyName);

export default async function minecraftProxyHandler(req, res) {
  const { group, service } = req.query;
  const serviceWidget = await getServiceWidget(group, service);
  const url = new URL(serviceWidget.url);
  try {
    const pingResponse = await pingWithPromise(url.hostname, url.port || 9876);
    res.status(200).send({
      version: pingResponse.servers[0].version,
      online: true,
      players: pingResponse.servers[0].players,
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
