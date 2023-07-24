export default interface Price {
  success: boostring;
  average_price: String;
  median_price: String;
  amount_sold: String;
  standard_deviation: String;
  lowest_price: String;
  highest_price: String;
  first_sale_data: String;
  time: String;
  currency: String;
}

type boostring = Boolean | String;
