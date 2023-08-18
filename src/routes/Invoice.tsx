import React, { useState } from "react";
import axios from "axios";
import InvoiceTable, {
    IInvoiceItem,
} from "../components/InvoiceTable/InvoiceTable";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { getInvoice, updateInvoice } from "../invoices";
import { Link } from "react-router-dom";

export async function loader({ params }: { params: any }) {
    const invoice = await getInvoice(params.invoiceId);
    console.log(invoice, 'invoice')
    return { invoice };
}

export enum InvoiceStatus {
    Draft = "Draft",
    Paid = "Paid",
    Oustanding = "Outstanding",
    Late = "Late",
    Uncollectable = "Uncollectable"
}

export interface IInvoice {
    id: string;
    name: string;
    dueDate: string;
    items: IInvoiceItem[];
    total: number;
    notes: string;
    status: InvoiceStatus;
}

type InvoiceLoaderData = {
    invoice: IInvoice;
};

function Invoice() {
    const navigate = useNavigate();
    const { invoice } = useLoaderData() as InvoiceLoaderData;
    console.log(invoice);
    const [name, setName] = useState<string>(invoice.name);
    const [dueDate, setDueDate] = useState(invoice.dueDate);
    const [items, setItems] = useState<IInvoiceItem[]>([...invoice.items]);
    const [notes, setNotes] = useState<string>(invoice.notes);
    const [status, setStatus] = useState<InvoiceStatus>(invoice.status);

    const total = items.reduce((prev, curr) => prev + curr.amount, 0);

    return (
        <div className="App">
            <Link to="/">Back to Home</Link>
            <label htmlFor="name">Invoice Name:</label>
            <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="due-date">Due Date:</label>
            <input
                type="datetime-local"
                id="due-date"
                name="due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <label htmlFor="status">Set status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as InvoiceStatus)} name="status" id="status">
                <option value="Paid">Paid</option>
                <option value="Outstanding">Outstanding</option>
                <option value="Uncollectable">Uncollectable</option>
            </select>

            <InvoiceTable items={items} setItems={setItems} total={total} />
            <br />

            <label htmlFor="notes">Notes:</label>
            <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <br />

            <button
                type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    const postBody: IInvoice = {
                        id: invoice.id,
                        name,
                        dueDate,
                        items,
                        total,
                        notes,
                        status,
                    };
                    const response = await axios.post(
                        "https://eob5gg57g649qqh.m.pipedream.net",
                        postBody
                    );
                    console.log(response);
                    await updateInvoice(invoice.id, postBody);
                    navigate("/");
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default Invoice;
