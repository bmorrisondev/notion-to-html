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

Results:

```html
<div><p>This is where its at!</p><p>Here is some more <strong>BOLDED </strong>content!</p><img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/340ec625-c186-4747-87cf-4d635efefcf4/snag-0208.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210902%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210902T142313Z&X-Amz-Expires=3600&X-Amz-Signature=473927d80609f236cf8a4dcead9be3c657654e51c74d87a74f1534c5c34a0be8&X-Amz-SignedHeaders=host" /><p>Some <em>italicized</em> text</p><p>Some <code>inline code</code></p><ul><li>Just</li><li>a bullet</li><li>list</li></ul><ol><li>Just a </li><li>numbered list</li><li>of ordered things</li></ol><h2>A level 1 heading</h2><h2>A level 2 heading</h2><h2>the smallest of headings</h2></div>
```

More examples will be added in the future.

## Known Issues & TODOs

- Image blocks generate AWS S3 Presigned URLs which expire after some time. Need to setup a way to download & cache them locally.
- Devise a way to add custom CSS classes to various elements.

## Support

For assistance in using this project, contact me on Twitter [@brianmmdev]("https://twitter.com/brianmmdev") or in my Discord at [fullstack.chat]("https://fullstack.chat").

## How to Contribute

- Fork the repository and make the changes
- Submit a PR into this repository
- Win