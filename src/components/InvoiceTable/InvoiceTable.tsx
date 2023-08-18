import React, { useState } from "react";
import InvoiceItem from "./InvoiceItem";
import { produce } from "immer";
import InvoiceTotal from "./InvoiceTotal";
import AddItemButton from "./AddItemButton";

export interface IInvoiceItem {
    id: number;
    description: string;
    qty: number;
    rate: number;
    amount: number;
}

const startingItems: IInvoiceItem[] = [
    {
        id: 0,
        description: "",
        qty: 0,
        rate: 0,
        amount: 0,
    },
];

const InvoiceTable = () => {
    const [items, setItems] = useState<IInvoiceItem[]>(startingItems);

    const handleItemChange = (
        id: number,
        property: keyof IInvoiceItem,
        newValue: string | number
    ) => {
        setItems(
            produce((draft) => {
                const item = draft.find((item) => item.id === id);
                if (item) {
                    console.log(typeof newValue);
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
                    item.amount = parseFloat((item.qty * item.rate).toFixed(2));
                }
            })
        );
    };

    const addLineItem = () => {
        setItems(
            produce(items, draft => {
                draft.push({
                    id: items.length,
                    description: "",
                    qty: 0,
                    rate: 0,
                    amount: 0,
                });
            })
        );
    };

    return (
        <div>
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
                            amount={item.amount}
                            handleItemChange={handleItemChange}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <InvoiceTotal
                        total={items.reduce(
                            (prev, curr) => prev + curr.amount,
                            0
                        )}
                    />
                </tfoot>
            </table>
            <AddItemButton addLineItem={addLineItem} />
        </div>
    );
};

export default InvoiceTable;
