const { default: axios } = require("axios");

module.exports = class NotionToHtmlClient {
  constructor(key) {
    this.apiBase = "https://api.notion.com/v1"
    this.key = key
  }

  async generateHtmlFromPage(pageId) {
    let html = "<div>"

    let isMakingUl = false
    let isMakingOl = false

    let page = await this.getPage(pageId)
    let blocks = await this.getBlockChildren(page.id)

    blocks.results.forEach(el => {
      if(el.type !== "bulleted_list_item" && isMakingUl) {
        html += "</ul>"
        isMakingUl = false
      }
      if(el.type !== "numbered_list_item" && isMakingOl) {
        html += "</ol>"
        isMakingOl = false
      }
      if(el.type === "bulleted_list_item" && !isMakingUl) {
        html += "<ul>"
        isMakingUl = true
      }
      if(el.type === "numbered_list_item" && !isMakingOl) {
        html += "<ol>"
        isMakingOl = true
      }
      html += this.makeHtml(el)
    })

    html += "</div>"
    return html
  }

  async getDatabase(databaseId) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/databases/${databaseId}`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async queryDatabase(databaseId) {
    let res = await axios({
      method: "post",
      url: `https://api.notion.com/v1/databases/${databaseId}/query`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async getPage(pageId) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/pages/${pageId}`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  async getBlockChildren(id) {
    let res = await axios({
      method: "get",
      url: `https://api.notion.com/v1/blocks/${id}/children`,
      headers: {
        "Authorization": `Bearer ${this.key}`,
        "Notion-Version": "2021-08-16"
      }
    })
    return res.data
  }

  makeParagraph(block) {
    let p = "<p>"
    block.paragraph.text.forEach(el => {
      let content = el.text.content
      if(el.annotations.bold) {
        content = `<strong>${content}</strong>`
      }

      if(el.annotations.italic) {
        content = `<em>${content}</em>`
      }

      if(el.annotations.code) {
        content = `<code>${content}</code>`
      }
      p += content
    })
    p += "</p>"
    return p
  }


  makeImg(block) {
    return `<img src="${block.image.file.url}" />`
  }

  makeListItem(block) {
    if(block.numbered_list_item) {
      return `<li>${block.numbered_list_item.text[0].text.content}</li>`
    }
    if(block.bulleted_list_item) {
      return `<li>${block.bulleted_list_item.text[0].text.content}</li>`
    }
  }

  makeHeading(block) {
    if(block.heading_1) {
      return `<h2>${block.heading_1.text[0].text.content}</h2>`
    }
    if(block.heading_2) {
      return `<h2>${block.heading_2.text[0].text.content}</h2>`
    }
    if(block.heading_3) {
      return `<h2>${block.heading_3.text[0].text.content}</h2>`
    }
  }

  makeHtml(block) {
    if(block.type === "paragraph") {
      return this.makeParagraph(block)
    }

    if(block.type === "image") {
      return this.makeImg(block)
    }

    if(block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      return this.makeListItem(block)
    }

    if(block.type.startsWith("heading_")) {
      return this.makeHeading(block)
    }

    return ""
  }
}