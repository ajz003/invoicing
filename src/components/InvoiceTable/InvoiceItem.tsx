import React from "react";
import { IInvoiceItem } from "./InvoiceTable";

interface InvoiceItemProps {
    id: number;
    description: string;
    qty: number;
    rate: number;
    handleItemChange: (id: number, property: keyof IInvoiceItem, newValue: string | number) => void;
}

const InvoiceItem = (props: InvoiceItemProps) => {
    const { id, description, qty, rate, handleItemChange } = props;
    return (
            <tr>
                <td>
                    <input type="text" value={description} onChange={(e) => handleItemChange(id, "description", e.target.value)} />
                </td>
                <td>
                    <input type="number" value={qty} onChange={(e) => handleItemChange(id, "qty", parseInt(e.target.value))} />
                </td>
                <td>
                    <input
                        type="number"
                        value={rate} min="0.01"step="0.01" onChange={(e) => handleItemChange(id, "rate", parseFloat(parseFloat(e.target.value).toFixed(2)))} />
                </td>
                <td>
                    <input type="number" readOnly value={(qty*rate).toFixed(2)} />
                </td>
            </tr>
    );
};

export default InvoiceItem;
