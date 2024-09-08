import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
	api: "{url}",
	proxyHandler: genericProxyHandler ,

	mappings: {
		info: {
			endpoint: "v1/",
		},
	},
};

export default widget;
