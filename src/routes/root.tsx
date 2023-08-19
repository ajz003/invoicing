import { Form, Link, useLoaderData } from "react-router-dom";
import { IInvoice, InvoiceStatus } from "./Invoice";
import { createInvoice, getInvoices } from "../invoices";
import "../App.scss";
import { useEffect, useState } from "react";

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
    const [displayAlert, setDisplayAlert] = useState(false);
    const [alertDismissed, setAlertDismissed] = useState(false);
 
    useEffect(() => {
        let isLate = false;
        invoices.forEach(invoice => {
            const d1 = Date.parse(invoice.dueDate);
            const d2 = Date.now();
            const invoiceLate = d1 < d2 && invoice.status === InvoiceStatus.Oustanding;
            if (invoiceLate) isLate = true;
        });

        if (isLate && !displayAlert && !alertDismissed) {
            setDisplayAlert(true);
        }
    }, [invoices, displayAlert, alertDismissed]);

    const handleDismissAlert = () => {
        setAlertDismissed(true);
        setDisplayAlert(false);
    }
    
    return (
        <>
            <div className="homepage">
                <h1>Invoices</h1>
                {displayAlert && (
                    <div className="alert">
                        <p>One or more invoices are late</p>
                        <span className="dismiss" onClick={handleDismissAlert}>X</span>
                    </div>
                )}
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
                            const isLate = d1 < d2 && invoice.status === InvoiceStatus.Oustanding;
                            return (
                                <tr key={invoice.id}>
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
                                    <td className={isLate ? "late" : ""}>{isLate ? "Late" : invoice.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="create-invoice-wrapper">
                    <Form method="post">
                        <button type="submit">Create New Invoice</button>
                    </Form>
                </div>
            </div>
        </>
    );
}
