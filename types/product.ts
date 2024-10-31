export enum ActivityTypes {
    tour = "тур",
    entry_ticket = "входной билет",
    transfer = "трансфер",
    composite_activity = "сборная экскурсия"
};


export type Product = {
    id: number,
    title: string,
    activity_type: ActivityTypes,
    main_photo: string,
    customers_review_rating: number,
    netto_price: string,
}