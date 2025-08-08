import { getSheetsClient } from './googleSheet';

export async function validateUser(email, password) {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.ACCOUNT_SHEET_ID,
    range: 'Accounts!A2:C',
  });
  const rows = res.data.values || [];
  const match = rows.find(([e, p]) => e === email && p === password);
  if (!match) return null;
  return { email: match[0], role: match[2] || 'user' };
}
