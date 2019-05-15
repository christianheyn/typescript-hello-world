import {
    DocStatus,
    Invoice,
    Offer,
    BilloDocument,
    ApiResponse,
    Resource,
} from './types';

// @ts-ignore-start
const a: number = "Im not a number!"
// @ts-ignore-end

const invoices: Invoice[] = [
    { id: "1", invoiceNumber: "", status: DocStatus.OPEN, price: 2 },
    { id: "2", invoiceNumber: "", status: DocStatus.DRAFT, price: 4 },
    { id: "3", invoiceNumber: "", status: DocStatus.DRAFT, price: 9 },
    { id: "4", invoiceNumber: "", status: DocStatus.WON, price: 1 },
];

const offers: Offer[] = [
    { id: "", price: 2 },
    { id: "", price: 4 },
    { id: "", price: 9 },
    { id: "", price: 1 },
];

function reduce<T extends BilloDocument>(acc: number, x: T):number {
    return acc + x.price;
}

const totalPrice: number = invoices.reduce(reduce, 0);
const totalPriceOffer: number = offers.reduce(reduce, 0);

console.log(totalPrice, totalPriceOffer);

const makeStatusChange: Function = (x: DocStatus, y: DocStatus) => <T extends BilloDocument>(c: T) => ({
    ...c,
    status: (c.status === x) ? y : c.status,
});

const openToCanceled: <T extends BilloDocument>(c: T) => T = makeStatusChange(DocStatus.OPEN, DocStatus.CANCELED);

const newInvoices: Invoice[] = invoices.map(openToCanceled);

function resolveInvoiceResponse(x: ApiResponse): Resource[] {
    if (!x.invoices || !x.invoices.invoice) {
        return [];
    }

    if (Array.isArray(x.invoices.invoice)) {
        return x.invoices.invoice;
    }

    return [x.invoices.invoice];
};

console.log(
    'FEHLER: ',
    resolveInvoiceResponse({
        errors: { error: "Fehler" }
    })
);

console.log(
    'Single Invoices: ',
    resolveInvoiceResponse({
        invoices: {
            invoice: newInvoices[0],
        },
    })
);

console.log(
    'Multiple Invoices: ',
    resolveInvoiceResponse({
        invoices: {
            invoice: newInvoices,
        },
    })
);
