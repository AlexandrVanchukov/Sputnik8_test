export enum ActivityTypes {
    tour = "tour",
    entry_ticket = "entry_ticket",
    transfer = "transfer",
    composite_activity = "composite_activity"
};


export type Product = {
    id: number,
    title: string,
    activity_type: ActivityTypes,
    main_photo: string,
    customers_review_rating: number,
    netto_price: string,
}