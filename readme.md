# notion-to-html

A simple library that converts Notion pages to HTML.

> ⚠ THIS LIBRARY IS STILL A WIP. MANY BLOCKS ARE NOT YET SUPPORTED. THEY WILL BE ADDED OVER TIME.

## How to Use

This package uses the official Notion API, so you'll need an integration token before you can use it. To create one, follow the guide at [https://developers.notion.com/docs/getting-started](https://developers.notion.com/docs/getting-started).

```js
const NotionToHtmlClient = require('@brianmmdev/notion-to-html')

let integrationToken = "123123123asdASDaasdfasdf"

// Create a client and pass in your integration token.
let client = new NotionToHtmlClient(integrationToken)

// Create html using the page ID (obtained from the URL)
let html = await client.generateHtmlFromPage("salkdjfalskdujf09a87dfo98as")
```

More examples will be added in the future.

## Known Issues

- Image blocks generate AWS S3 Presigned URLs which expire after some time. Need to setup a way to download & cache them locally.

## Support

For assistance in using this project, contact me on Twitter [@brianmmdev]("https://twitter.com/brianmmdev") or in my Discord at [fullstack.chat]("https://fullstack.chat").

## How to Contribute

- Fork the repository and make the changes
- Submit a PR into this repository
- Win