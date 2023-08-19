import React from "react";

const InvoiceTotal = (props: { total: number }) => {
    return (
        <tr>
            <th id="total" colSpan={3}>
                Total :
            </th>
            <td className="amount-total">
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(props.total)}
            </td>
        </tr>
    );
};

export default InvoiceTotal;
