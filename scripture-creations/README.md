## Publishing to Github

npm run within the "scripture-creations" folder. WEBSITE doesn't recognize npm.
```npm run deploy``` uses Vite to create the dist folder, the HTML output of Vite.
gh-pages uses this as the base of the website on GitHub.

We installed the GitHub publisher like this:
```npm install --save-dev gh-pages```

## Excel Reading
```npm install csv-parser``` as well as xlsx

## Mention of a high severity vulnerability
This is related to the xlsx module which is only utilized to transfer the catalog to a json file. Ignore entirely.

## How to Update The Catalog:
Run this line:
```
node scripts/xlsx-to-json.js
```
For product photos, drop them all into /images/products and then run this line:
```
node scripts/gen-webp-images.js
```
then build and deploy:
```
npm run build
npm run deploy
```

# Where to place images
You'll find the place to put product images in:
```
scripture-creations/public/images/products
```
The catalog excel file to replace is found in:
```
scripture-creations/catalog.xlsx
```
It should have a '?' box icon

## Mention of a high severity vulnerability
This is related to the xlsx module which is only utilized to transfer the catalog to a json file. Ignore entirely.

## DEVELOPER WARNINGS:
Test environment still runs full purchasing functionality. You have been warned.
To anyone who somehow got their hands on this site's Git history, you won't find any Braintree keys here. 