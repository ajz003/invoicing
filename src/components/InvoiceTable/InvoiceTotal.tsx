import React from "react";

const InvoiceTotal = (props: {
    total: number
}) => {
    return (
        <tr>
            <th id="total" colSpan={3}>
                Total :
            </th>
            <td> {props.total}</td>
        </tr>
    );
};

export default InvoiceTotal;
