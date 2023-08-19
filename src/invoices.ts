import localforage from "localforage";
import { IInvoice, InvoiceStatus } from "./routes/Invoice";

export async function getInvoices(): Promise<IInvoice[]> {
    await fakeNetwork("getInvoices:");
    let invoices: IInvoice[] | null = await localforage.getItem("invoices");
    if (!invoices) invoices = [];
    return invoices;
}

export async function createInvoice() {
    await fakeNetwork();
    const id = Math.random().toString(36).substring(2, 9);
    const invoice: IInvoice = {
        id,
        name: "New Invoice",
        dueDate: "",
        items: [],
        total: 0,
        notes: "",
        status: InvoiceStatus.Draft,
    };
    const invoices: IInvoice[] = await getInvoices();
    invoices.unshift(invoice);
    await set(invoices);
    return invoice;
}

export async function getInvoice(id: string) {
    await fakeNetwork(`invoice:${id}`);
    let invoices: IInvoice[] | null = await localforage.getItem("invoices");
    if (invoices === null) return null;
    let invoice = invoices.find((invoice) => invoice.id === id);
    return invoice ?? null;
}

export async function updateInvoice(id: string, updates: IInvoice) {
    await fakeNetwork();
    let invoices: IInvoice[] | null = await localforage.getItem("invoices");
    if (invoices === null) throw new Error("No invoice found for " + id);
    let invoice = invoices.find((invoice) => invoice.id === id);
    if (!invoice) throw new Error("No invoice found for " + id);
    Object.assign(invoice, updates);
    await set(invoices);
    return invoice;
}

// TODO: Implement DELETE
// export async function deleteInvoice(id) {
//     let invoices: IInvoice[] | null = await localforage.getItem("invoices");
//     if (invoices === null) throw new Error("No invoice found for", id);
//     let index = invoices.findIndex((invoice) => invoice.id === id);
//     if (index > -1) {
//         invoices.splice(index, 1);
//         await set(invoices);
//         return true;
//     }
//     return false;
// }

function set(invoices: IInvoice[]) {
    return localforage.setItem("invoices", invoices);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {};

async function fakeNetwork(key?: string) {
    if (!key) {
        fakeCache = {};
    }

    if (key && fakeCache[key]) {
        if (fakeCache[key]) {
            return;
        }
        fakeCache[key] = true;
    }

    return new Promise((res) => {
        setTimeout(res, Math.random() * 200);
    });
}
