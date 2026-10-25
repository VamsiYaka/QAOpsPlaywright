const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');

async function writeExcelTest(searchText, replaceText, change, filePath) {
   const workbook = new ExcelJs.Workbook();
   await workbook.xlsx.readFile(filePath);
   const worksheet = workbook.getWorksheet('Sheet1');
   const output = readExcel(worksheet, searchText); // not async

   const cell = worksheet.getCell(output.row, output.column + change.colChange);
   cell.value = replaceText;
   await workbook.xlsx.writeFile(filePath);
}

// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
   let output = { row: -1, column: -1 };
   worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
         if (cell.value === searchText) {
            output = { row: rowNumber, column: colNumber };
         }
      });
   });
   return output;
}

test('Upload download excel validation', async ({ page }) => {
   const textSearch = 'Mango';
   const updateValue = '350';

   await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

   // 1. Wait for the download event
   const downloadPromise = page.waitForEvent('download');
   await page.getByRole('button', { name: 'Download' }).click();
   const download = await downloadPromise;

   // 2. Define a local path in your project directory and save it there
   const filePath = path.join(__dirname, 'download.xlsx');
   await download.saveAs(filePath);

   // 3. Edit the Excel file using ExcelJS
   await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);

   // 4. Upload the modified file back to the web application
   await page.locator('#fileinput').setInputFiles(filePath);

   // 5. Assert the updated value appears in the UI
   const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
   await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});