## React + Vite
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

## RUNNING THE XLSX-TO-JSON CONVERTER:
simply run this line:
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

## DEVELOPER WARNINGS:
Test environment still runs full purchasing functionality. You have been warned.
To anyone who somehow got their hands on this site's Git history, you won't find any Braintree keys here. 