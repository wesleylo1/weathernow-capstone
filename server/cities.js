// import dependencies
const fs = require('fs')
const XLSX = require('xlsx')

// read file into memory
const workbook = XLSX.readFile("cities.xlsx")

// convert xlsx to json. workbook is like a folder. Sheet is like a file in a folder/workbook
let worksheets = {}
for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

// show the data as JSON
console.log("json:\n", JSON.stringify(worksheets.Sheet1), "\n\n")