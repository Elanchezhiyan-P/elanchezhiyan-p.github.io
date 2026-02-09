import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-W0KG44LXCR";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
