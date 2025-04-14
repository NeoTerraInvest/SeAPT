declare namespace API {
  interface marketRes {
    id: string;
    base_currency_id: string;
    quote_currency_id: string;
    min_price: string;
    max_price: string;
    price_increment: string;
    min_quantity: string;
    max_quantity: string;
    quantity_precision: number;
    min_cost: string;
    max_cost: string;
    cost_precision: number;
    maker_fee_rate: string;
    taker_fee_rate: string;
    show_in_ui: boolean;
    closed: boolean;
  }

  interface marketResList {
    data: marketRes[];
  }
}

export type { API };
