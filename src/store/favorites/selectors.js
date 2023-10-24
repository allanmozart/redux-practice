import { get } from "lodash";

export const getFavorites = (store) => get(store, "favorites", []);
