import React, { useState } from "react";
import InvoiceItem from "./InvoiceItem";
import { produce } from "immer";

export interface IInvoiceItem {
    id: number;
    description: string;
    qty: number;
    rate: number;
}

const dummyItems: IInvoiceItem[] = [
    {
        id: 0,
        description: "",
        qty: 0,
        rate: 0,
    },
];

const InvoiceTable = () => {
    const [items, setItems] = useState<IInvoiceItem[]>(dummyItems);

    const handleItemChange = (
        id: number,
        property: keyof IInvoiceItem,
        newValue: string | number
    ) => {
        setItems(
            produce((draft) => {
                const item = draft.find((item) => item.id === id);
                if (item) {
                    console.log(typeof newValue)
                    if (
                        typeof newValue === "string" &&
                        property === "description"
                    ) {
                        item.description = newValue;
                    } else if (typeof newValue === "number") {
                        switch (property) {
                            case "qty":
                                item.qty = newValue;
                                break;
                            case "rate":
                                item.rate = newValue;
                                break;
                            default:
                                break;
                        }
                    }
                }
            })
        );
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, i) => (
                    <InvoiceItem
                        key={i}
                        id={item.id}
                        description={item.description}
                        qty={item.qty}
                        rate={item.rate}
                        handleItemChange={handleItemChange}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default InvoiceTable;
