type ID = string

export interface BilloDocument {
    readonly id: ID,
    readonly [propName: string]: any;
};

export enum DocStatus {
    OPEN = "OPEN",
    WON = "WON",
    DRAFT = "DRAFT",
    OVERDUE = "OVERDUE",
    CANCELED = "CANCELED",
};

export interface Invoice extends BilloDocument {
    readonly invoiceNumber: string,
    readonly status: DocStatus,
    readonly date?: string,
    readonly clientId?: ID,
};

export interface Offer extends BilloDocument {};

interface Client extends BilloDocument {
    readonly name: string,
    readonly address: string,
};

export type ErrorMsg = string;
export type Resource = Invoice | Invoice[] | Client | ErrorMsg;

export interface ApiResponse {
    readonly [propName: string]: {
        readonly [propName: string]: Resource
    }
}
