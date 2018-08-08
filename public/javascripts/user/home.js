$(document).ready(() => {
  let username = $($('a')[0]).attr('href').split('/')[1]

  $.ajax({
    type: 'POST',
    url: '/' + username + '/home/main',
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
    url: '/' + username + '/home/recommend',
    dataType: 'json', 
    success: (data) => {
      let tpl = $('#allTemplate').html()
      let template = Handlebars.compile(tpl)
      let html = template(data);
      $('#boxOfAllTemplate').html(html)

      $('.collect').click(function() {

        let title = $(this).attr('id').split('_')[0]
        let author = $(this).attr('id').split('_')[1]

        if ($(this).hasClass('glyphicon-heart-empty')) {
          $(this).removeClass('glyphicon-heart-empty')
          $(this).addClass('glyphicon-heart')

          $.ajax({
            type: 'POST',
            url: '/' + username + '/home/collect',
            dataType: 'json', 
            data: {
              username: username,
              title:    title,
              author:   author
            },
            success: (data) => {}
          })
        }
        else {
          $(this).removeClass('glyphicon-heart')
          $(this).addClass('glyphicon-heart-empty')

          $.ajax({
            type: 'POST',
            url: '/' + username + '/home/cancelCollect',
            dataType: 'json', 
            data: {
              username: username,
              title:    title,
              author:   author
            },
            success: (data) => {}
          })
        }
      })
    }
  })
})