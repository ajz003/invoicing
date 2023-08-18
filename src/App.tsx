import React, { useState } from "react";
import "./App.css";
import InvoiceTable, {
    IInvoiceItem,
} from "./components/InvoiceTable/InvoiceTable";
import axios from "axios";

interface IInvoicePostBody {
    items: IInvoiceItem[];
    total: number;
    notes: string;
}

function App() {
    const [items, setItems] = useState<IInvoiceItem[]>([
        {
            id: 0,
            description: "",
            qty: 0,
            rate: 0,
            amount: 0,
        },
    ]);
    const [notes, setNotes] = useState<string>("");

    const total = items.reduce((prev, curr) => prev + curr.amount, 0);

    return (
        <div className="App">
            <InvoiceTable items={items} setItems={setItems} total={total} />
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
                onClick={(e) => {
                    e.preventDefault();
                    const postBody: IInvoicePostBody = {
                        items,
                        total,
                        notes,
                    };
                    axios
                        .post(
                            "https://eob5gg57g649qqh.m.pipedream.net",
                            postBody
                        )
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default App;
