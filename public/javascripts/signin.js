let relieve = () => {
  $.ajax({
    type: 'POST',
    url: '/signin/pass',
    dataType: 'json', 
    success: (data) => {
      if (data.success) 
        $('#submit').removeClass('disabled')
      else {
        if (!$('#submit').hasClass('disabled'))
          $('#submit').addClass('disabled')
      }
    }
  })
}

$(document).ready(() => {
  $('#submit').addClass('disabled')

  $('#captcha').click(() => {
    $('#captcha').attr('src', '/captcha?r=' + Math.random())
  })

  $('#username').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/signin/judge',
      data: {
        'username': $('#username').val(),
        'property': 'username'
      },
      dataType: 'json', 
      success: (data) => {
        if (data.success) {
          $('#usernameResult').text('')
          $('#usernameRemove').css('visibility', 'hidden')
          $('#usernameOk').css('visibility', 'visible')
          relieve()
        } 
        else {
          $('#usernameResult').text(data.msg)
          $('#usernameRemove').css('visibility', 'visible')
          $('#usernameOk').css('visibility', 'hidden')
        }
      }
    })
  })
  $('#password').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/signin/judge',
      data: {
        'username': $('#username').val(),
        'password': $('#password').val(),
        'property': 'password'
      },
      dataType: 'json', 
      success: (data) => {
        if (data.success) {
          $('#passwordResult').text('')
          $('#passwordRemove').css('visibility', 'hidden')
          $('#passwordOk').css('visibility', 'visible')
          relieve()
        } 
        else {
          $('#passwordResult').text(data.msg)
          $('#passwordRemove').css('visibility', 'visible')
          $('#passwordOk').css('visibility', 'hidden')
        }
      }
    })
  })

  $('#inputCaptcha').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/signin/judge',
      data: {
        'captcha': $('#inputCaptcha').val(),
        'property': 'captcha'
      },
      dataType: 'json', 
      success: (data) => {
        if (data.success) {
          $('#captchaResult').text('')
          relieve()
        }
        else 
          $('#captchaResult').text(data.msg)
      }
    })
  })

  $('#submit').click(() => {
    if (!$('#submit').hasClass('disabled')) {
      $.ajax({
        type: 'POST',
        url: '/signin/submit',
        data: {
          'username': $('#username').val()
        },
        success: (data) => {
          location.href = $('#username').val() + '/home'
        }
      })
    }
  })  
})