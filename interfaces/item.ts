import Price from "./prices";
import Tags from "./tags";

export interface Item {
  appid: Number;
  background_color: String;
  classid: String;
  commodity: Number;
  currency: Number;
  descriptions: Array<Object>;
  icon_url: String;
  instanceid: String;
  market_buy_country_restriction: String;
  market_hash_name: String;
  market_name: String;
  market_tradable_restriction: Number;
  marketable: Number;
  name: String;
  name_color: String;
  tags: Array<Tags>;
  tradable: Number;
  type: String;
  price: Price;
}
