import Item from "./item";

export default interface SteamObject {
  assets: Array<Object>;
  descriptions: Array<Item>;
  rwqrsn: Number;
  success: Number;
  total_inventory_count: Number;
}
