$(document).ready(() => {
  let username = $($('a')[0]).attr('href').split('/')[1]
  let titlePass = false 
  let classificationPass = false 
  let contentPass = false

  $('#title').blur(function() {
    if ($('#title').val() == '') {
      $('#titleResult').text('标题不能为空')
      titlePass = false
    }
    else if ($('#title').val().length > 15) {
      $('#titleResult').text('标题不宜超过15字')
      titlePass = false
    }
    else {
      $('#titleResult').text('')
      titlePass = true
    }
  })

  $('#classification').blur(function() {
    if ($('#classification').val() == '') {
      $('#classificationResult').text('分类不能为空')
      classificationPass = false
    }
    else if ($('#classification').val().length > 15) {
      $('#classificationResult').text('类名不宜超过15字')
      classificationPass = false
    }
    else {
      $('#classificationResult').text('')
      classificationPass = true
    }
  })

  $('#content').blur(function() {
    if ($('#content').val() == '') {
      $('#contentResult').text('内容不能为空')
      contentPass = false
    }
    else if ($('#content').val().length < 15) {
      $('#contentResult').text('内容不宜少于15字')
      contentPass = false
    }
    else {
      $('#contentResult').text('')
      contentPass = true
    }
  })

  $('#save').click(function() {
    $.ajax({
      type: 'POST',
        url: '/' + username + '/write/save',
        dataType: 'json', 
        data: {
          username: username,
          title:    $('#title').val(),
          classification: $('#classification').val(),
          content:  $('#content').val()
        },
        success: (data) => {
          location.href = '/' + username + '/home'
        }
    })
  })

  $('#submit').click(function() {

    $('#title').trigger('blur')
    $('#classification').trigger('blur')
    $('#content').trigger('blur')

    if (titlePass && classificationPass && contentPass) {
      $.ajax({
        type: 'POST',
        url: '/' + username + '/write/judge',
        dataType: 'json', 
        data: {
          'title': $('#title').val()   
        },
        success: (data) => {
          if (data.success) {
            $('#modalClick').trigger('click')
          }
          else {
            $.ajax({
              type: 'POST',
              url: '/' + username + '/write',
              dataType: 'json', 
              data: {
                username: username,
                title:    $('#title').val(),
                classification: $('#classification').val(),
                content:  $('#content').val()
              },
              success: (data) => {
                if (data.success)
                  location.href = '/' + username + '/home'
              }
            })
          }
        }
      })
    }
  })

  $('#sure').click(() => {
    $.ajax({
      type: 'POST',
      url: '/' + username + '/write',
      dataType: 'json', 
      data: {
        username: username,
        title:    $('#title').val(),
        classification: $('#classification').val(),
        content:  $('#content').val()
      },
      success: (data) => {
        if (data.success)
          location.href = '/' + username + '/home'
      }
    })
  })
})