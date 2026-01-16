import XLSX from 'xlsx';
import fs from 'fs';

const workbook = XLSX.readFile('catalog.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const products = XLSX.utils.sheet_to_json(sheet, { defval: ''});

fs.writeFileSync('src/catalog.json', JSON.stringify(products, null, 2));
console.log('catalog.json has been generated.');