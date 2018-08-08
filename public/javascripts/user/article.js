$(document).ready(() => {
  let username = $($('a')[0]).attr('href').split('/')[1]
  let title = $('#title').text()

  $.ajax({
    type: 'POST',
    url: '/' + username + '/article/' + title,
    dataType: 'json', 
    success: (data) => {
      let tpl = $('#myTemplate').html()
      let template = Handlebars.compile(tpl)
      let html = template(data);
      $('#boxOfMyTemplate').html(html)
    }
  })

  $.ajax({
    type: 'POST',
    url: '/' + username + '/article/' + title + '/lastAndNext',
    dataType: 'json', 
    success: (data) => {
      if (data.last) {
        $('#leftDash').addClass('glyphicon-chevron-left')
        $('#leftLink').attr('href', '/' + username + '/article/' + data.last)
        $('#leftLink').text(data.last)
      }
      if (data.next) {
        $('#rightDash').addClass('glyphicon-chevron-right')
        $('#rightLink').attr('href', '/' + username + '/article/' + data.next)
        $('#rightLink').text(data.next)
      }
    }
  })
})