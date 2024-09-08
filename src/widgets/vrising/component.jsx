

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {

const { widget } = service;

const { data, error } = useWidgetAPI(widget, "info");

if (error){
	return <Container service={service} error={error} />;
}

if(!data) {
	return (
		<Container service={service}>
		  <Block label="valheim.key1" />
		  <Block label="valheim.key2" />
		  <Block label="valheim.key3" />
		  <Block label="valheim.key4" />
		</Container>
	);
}

const currentStatus = <span className="text-green-500">Online</span>
const players = `${data.response.servers[0].players} / ${data.response.servers[0].max_players}`
return (
	<Container service={service}>
	  <Block label="Status" value={currentStatus} />
	  <Block label="Players" value={players} />
	  <Block label="Version" value="0.218.21" />
	  <Block label="Password" value="multipass" />
	</Container>
);
}
