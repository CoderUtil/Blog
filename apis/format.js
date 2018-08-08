let format = (date) => {  
  let y = date.getFullYear() 
  let m = date.getMonth() + 1  
  m = m < 10 ? ('0' + m) : m  
  let d = date.getDate()  
  d = d < 10 ? ('0' + d) : d 
  return y + '-' + m + '-' + d  
}

module.exports = {
  formatArray: (docs) => {
    let articles = []
    for (let i = 0; i < docs.length; i++) {
      /*
        不能直接 article = docs[i]
                article.date = docs[i].date, 
        因为这样赋值会使得article.date的类型为Date, 即使给它赋字符串也会转为Data  
       */
      let article = {
        'title':          docs[i].title,
        'content':        docs[i].content,
        'date':           format(docs[i].date),
        'classification': docs[i].classification,
        'identifier':     docs[i].identifier
      }
      articles.push(article)
    }
    let data = {
      'articles': articles
    }
    return data
  },
  formatObject: (docs) => {
    let article = {
      'title':          docs.title,
      'content':        docs.content,
      'date':           format(docs.date),
      'classification': docs.classification,
      'identifier':     docs.identifier
    }
    return article
  },
  formatRecommend: (docs) => {
    let articles = []
    let length = (docs.length > 5) ? 5 : docs.length
    for (let i = 0; i < length; i++) {
      let article = {
        'username': docs[i].username,
        'title':    docs[i].title
      }
      articles.push(article)
    }
    let data = {
      'articles': articles
    }
    return data
  },
  formatDraftAndCollect: (docs) => {
    let articles = []
    for (let i = 0; i < docs.length; i++) {
      let article = {
        'username': docs[i].username,
        'title':    docs[i].title
      }
      articles.push(article)
    }
    let data = {
      'articles': articles
    }
    return data
  }
}