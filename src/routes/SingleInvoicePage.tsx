import React, { useState } from "react";
import axios from "axios";
import InvoiceTable, {
    IInvoiceItem,
} from "../components/InvoiceTable/InvoiceTable";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getInvoice, updateInvoice } from "../invoices";
import { Link } from "react-router-dom";

export async function loader({ params }: { params: any }) {
    const invoice = await getInvoice(params.invoiceId);
    return { invoice };
}

export enum InvoiceStatus {
    Draft = "Draft",
    Paid = "Paid",
    Oustanding = "Outstanding",
    Late = "Late",
    Uncollectable = "Uncollectable",
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

const SingleInvoicePage = () => {
    const navigate = useNavigate();
    const { invoice } = useLoaderData() as InvoiceLoaderData;
    const [name, setName] = useState<string>(invoice.name);
    const [dueDate, setDueDate] = useState(invoice.dueDate);
    const [items, setItems] = useState<IInvoiceItem[]>(
        invoice.items.length === 0
            ? [
                  {
                      id: 0,
                      description: "",
                      qty: 0,
                      rate: 0,
                      amount: 0,
                  },
              ]
            : [...invoice.items]
    );
    const [notes, setNotes] = useState<string>(invoice.notes);
    const [status, setStatus] = useState<InvoiceStatus>(invoice.status);

    const total = items.reduce((prev, curr) => prev + curr.amount, 0);

    return (
        <div className="invoice-page">
            <Link className="back-btn" to="/">
                Back to Home
            </Link>

            <div className="invoice-header">
                <div>
                    <label htmlFor="name">Invoice Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="due-date">Due Date:</label>
                    <input
                        type="datetime-local"
                        id="due-date"
                        name="due-date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value as InvoiceStatus)
                        }
                        name="status"
                        id="status"
                    >
                        <option value="Outstanding">Outstanding</option>
                        <option value="Paid">Paid</option>
                        <option value="Uncollectable">Uncollectable</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
            </div>

            <InvoiceTable items={items} setItems={setItems} total={total} />

            <label htmlFor="notes">Notes:</label>
            <textarea
                id="notes"
                name="notes"
                value={notes}
                rows={4}
                cols={50}
                onChange={(e) => setNotes(e.target.value)}
            />

            <button
                type="submit"
                className="save-btn"
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
                    // Update IndexedDB
                    await updateInvoice(invoice.id, postBody);

                    navigate("/");
                }}
            >
                Save
            </button>
        </div>
    );
}

export default SingleInvoicePage;
