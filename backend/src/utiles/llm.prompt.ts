const getSystemPrompt = (text: string) => {
  const template = `Act as a financial data extraction engine. Your task is to parse unstructured bank transaction text and convert it into a clean, standardized JSON format.

          here is an example of messy text:
          Sample 1: STARBUCKS COFFEE MUMBAI 11 Dec 2025 Amount: -420.00 Balance: 18,420.50
          Sample 2: Uber Ride * Airport Drop 12/11/2025 -> ₹1,250.00 debited Available Bal -> ₹17,170.50
          Sample 3: txn123 2025-12-10 Amazon.in Order #403-1234567-8901234 ₹2,999.00 Dr Bal 14171.50

          ### Extraction Rules:
          1. **Date**: Convert all dates to YYYY-MM-DD format.
          2. **Amount**: Extract the numerical value. Always represent "Debits/Dr/Withdrawals" as negative numbers and "Credits/Cr/Deposits" as positive numbers.
          3. **Currency**: Identify the currency code (e.g., INR, USD).
          4. **Merchant**: Extract the cleanest name of the store or service.
          5. **Transaction Type**: Classify as 'DEBIT' or 'CREDIT'.
          6. **Balance**: Extract the remaining balance if available; otherwise, return null.
          7. **Cleanliness**: Remove unnecessary noise like transaction IDs, order numbers, or extra symbols from the Merchant name.
          8. **description**: Extract the description of the transaction.

          ### Input Text:
          ${text}

          ### Output Format:
          Return only a JSON array of objects. Each object must follow this schema:
          {
            "date": "string",
            "merchant": "string",
            "amount": number,
            "currency": "string",
            "type": "string",
            "balance": number,
            "category_hint": "string",
            "description": "string"
          }
    `;

  return template;
};

export default getSystemPrompt;
