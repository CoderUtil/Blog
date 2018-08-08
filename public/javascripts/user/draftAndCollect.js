$(document).ready(() => {
    let username = $($('a')[0]).attr('href').split('/')[1]

    $('#collect').addClass('activeTag')

    $.ajax({
        type: 'POST',
        url: '/' + username + '/draftAndCollect',
        dataType: 'json',
        success: (data) => {
            let tpl = $('#templateRight').html()
            let template = Handlebars.compile(tpl)
            let html = template(data.article);
            $('#right').html(html)



            if (data.state == 'collect') {
                $('.delete').text('取消收藏')
                $('#collect').addClass('activeTag')
                $('#draft').removeClass('activeTag')
            }
            else {
                $('.delete').text('删除')
                $('#collect').removeClass('activeTag')
                $('#draft').addClass('activeTag')
            }

            $('.delete').click(function() {
                let text = $(this).attr('id').split('Delete')[0]
                if (data.state == 'collect')
                    $('#text').text('确定要取消收藏\"' + text + '\"吗?')
                else 
                    $('#text').text('确定要删除\"' + text + '\"吗?')
            })
    
            $('#sureDelete').click(function() {
                $.ajax({
                    type: 'POST',
                    url: '/' + username + '/draftAndCollect/delete',
                    dataType: 'json',
                    data: {
                        'title': $('.delete').attr('id').split('Delete')[0]
                    },
                    success: (data) => {
                        location.href = '/' + username + '/draftAndCollect'
                    }
                })
            })

            $('.look').click(function() {
                if (data.state == 'collect')
                    location.href = '/' + username + '/article/' + $('.look').attr('id').split('Look')[0]
                else {
                    $.ajax({
                        type: 'POST',
                        url: '/' + username + '/draftAndCollect/look',
                        dataType: 'json',
                        data: {
                            'title': $('.look').attr('id').split('Look')[0]
                        },
                        success: (data) => {
                            location.href = '/' + username + '/write'
                        }
                    })
                }
            })
        }
    })
})