# Invoicing App

This take-home project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) as a base.

## Installation

1. Run `npm install`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Features

- Ability to create invoices
- Add line items
- Note section
- HTTP POST to pipedream.net on Save, which is has the body of the request in the response
- Alert when invoice(s) are late
- Invoice statuses

## Usage

1. Press "Create New Invoice"
2. Click the newly created Invoice.
3. Fill in desired inputs: name, due date, status, etc.
4. After being returned to the home page, click the Invoice again to verify the data is still set.

## Next Steps

- Add Delete Invoice functionality
- Validation for fields that are deemed "Required"
