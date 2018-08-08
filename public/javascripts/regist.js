let relieve = () => {
  $.ajax({
    type: 'POST',
    url: '/regist/pass',
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

  $('#usernameModal').click(() => {
    $('.modal-body').text('用户名由6~18位的数字、字母、下划线组成, 且由字母开头')
  })

  $('#passwordModal').click(() => {
    $('.modal-body').text('密码由6~12位的数字、字母、下划线, 中划线组成')
  })

  $('#captcha').click(() => {
    $('#captcha').attr('src', '/captcha?r=' + Math.random())
  })

  $('#username').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/regist/judge',
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
      url: '/regist/judge',
      data: {
        'password': $('#password').val(),
        'verify': $('#verify').val(),
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

  $('#verify').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/regist/judge',
      data: {
        'password': $('#password').val(),
        'verify': $('#verify').val(),
        'property': 'verify'
      },
      dataType: 'json', 
      success: (data) => {
        if (data.success) {
          $('#verifyResult').text('')
          $('#verifyRemove').css('visibility', 'hidden')
          $('#verifyOk').css('visibility', 'visible')
          relieve()
        } 
        else {
          $('#verifyResult').text(data.msg)
          $('#verifyRemove').css('visibility', 'visible')
          $('#verifyOk').css('visibility', 'hidden')
        }
      }
    })
  })

  $('#inputCaptcha').blur(() => {
    $.ajax({
      type: 'POST',
      url: '/regist/judge',
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
        url: '/regist/submit',
        data: {
          'username': $('#username').val(),
          'password': $('#password').val()
        },
        success: (data) => {
          location.href = $('#username').val() + '/home'
        }
      })
    }
  })
})