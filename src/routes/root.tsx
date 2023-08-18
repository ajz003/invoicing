import { Form, Link, useLoaderData } from "react-router-dom";
import { IInvoice, InvoiceStatus } from "./Invoice";
import { createInvoice, getInvoices } from "../invoices";

export async function loader() {
    const invoices = await getInvoices();
    return { invoices };
}

type RootLoaderData = {
    invoices: IInvoice[];
};

export async function action() {
    const invoice = await createInvoice();
    return { invoice };
}

export default function Root() {
    const { invoices } = useLoaderData() as RootLoaderData;
    return (
        <>
            <div id="sidebar">
                <h1>Invoices</h1>
                <div>
                    <Form method="post">
                        <button type="submit">Create New Invoice</button>
                    </Form>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice: IInvoice) => {
                            const d1 = Date.parse(invoice.dueDate);
                            const d2 = Date.now();
                            return (
                                <tr>
                                    <td>
                                        <Link to={`invoices/${invoice.id}`}>
                                            {invoice.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            value={invoice.dueDate}
                                            readOnly
                                        />
                                    </td>
                                    <td>{d1 < d2 && invoice.status === InvoiceStatus.Oustanding ? "Late" : invoice.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
