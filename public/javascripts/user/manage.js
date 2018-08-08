$(document).ready(() => {
  let username = $($('a')[0]).attr('href').split('/')[1]

  $.ajax({
    type: 'POST',
    url: '/' + username + '/manage',
    dataType: 'json', 
    data: {
      'get': 'left'    
    },
    success: (data) => {
      let tpl = $('#templateLeft').html()
      let template = Handlebars.compile(tpl)
      let html = template(data);
      $('#left').html(html)

      if (data.classifications.length == 0) 
        $('#main').addClass('main')
      else
        $('#main').removeClass('main')
        
    }
  })

  $.ajax({
    type: 'POST',
    url: '/' + username + '/manage',
    dataType: 'json',
    data: {
      'get': 'right'
    },
    success: (data) => {
      let tpl = $('#templateRight').html()
      let template = Handlebars.compile(tpl)
      let html = template(data.article);
      $('#right').html(html)

      if (data.classification != null) {
        $('.' + data.classification).addClass('activeClassification')
      }

      $('.delete').click(function() {
        let text = $(this).attr('id').split('Delete')[0]
        $('#text').text('确定要删除\"' + text + '\"吗?')
      })

      $('#sureDelete').click(function() {
        $.ajax({
          type: 'POST',
          url: '/' + username + '/manage/delete',
          dataType: 'json',
          data: {
            'title': $('.delete').attr('id').split('Delete')[0]
          },
          success: (data) => {
            location.href = '/' + username + '/manage'
          }
        })
      })

      $('.modify').click(function() {
        $.ajax({
          type: 'POST',
          url: '/' + username + '/manage/modify',
          dataType: 'json',
          data: {
            'title': $(this).attr('id').split('Modify')[0]
          },
          success: (data) => {
            location.href = '/' + username + '/write'
          }
        })
      })
    }
  })
})