import { getSheetsClient } from './googleSheet';

const RANGE = 'Products!A2:H';

export async function getProducts() {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    range: RANGE,
  });
  const rows = res.data.values || [];
  return rows.map(([id, name, description, price, image, link, clicks = '0', views = '0']) => ({
    id,
    name,
    description,
    price,
    image,
    link,
    clicks: Number(clicks),
    views: Number(views)
  }));
}

export async function addProduct(product) {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    range: RANGE,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        product.id,
        product.name,
        product.description,
        product.price,
        product.image,
        product.link,
        0,
        0
      ]]
    }
  });
  return product;
}

export async function incrementClick(id) {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return;
  const sheets = await getSheetsClient();
  const row = index + 2; // because header + 1
  const clicks = products[index].clicks + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    range: `Products!G${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[clicks]] }
  });
}

export async function updateProduct(product) {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index === -1) return;
  const row = index + 2;
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    range: `Products!A${row}:F${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        product.id,
        product.name,
        product.description,
        product.price,
        product.image,
        product.link
      ]]
    }
  });
  return product;
}

export async function deleteProduct(id) {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return;
  const row = index + 1;
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: 0,
            dimension: 'ROWS',
            startIndex: row,
            endIndex: row + 1
          }
        }
      }]
    }
  });
}

export async function incrementView(id) {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return;
  const sheets = await getSheetsClient();
  const row = index + 2;
  const views = products[index].views + 1;
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.PRODUCT_SHEET_ID,
    range: `Products!H${row}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [[views]] }
  });
}
