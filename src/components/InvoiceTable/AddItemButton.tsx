import React from "react";

const AddItemButton = (props: {
    addLineItem: () => void;
}) => {
    return (
        <button className="add-item-btn" type="button" onClick={props.addLineItem}>+ Add Line Item</button>
    );
};

export default AddItemButton;
