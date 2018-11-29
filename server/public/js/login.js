$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow")
 })

 $(document).ready(() => {
     $('#register-form').submit(e => {
        var name = $('#register-name').val()
        var username = $('#register-username').val()
        var password = $('#register-password').val()
        register(name, username, password)
     })

     $('#login-form').submit(e => {
        var username = $('#login-username').val()
        var password = $('#login-password').val()
        login(username, password)
    })
 })

register = (name, username, password) => {

    var url = '/register';

    $.ajax({
        url: url,
        type: "POST",
        data: { 
            name: name,
            username: username,
            password: password
         },
        success: goToLoggedPage
    })
}

login = (username, password) => {
    
    var url = '/login';

    $.ajax({
        url: url,
        type: "POST",
        data: { 
            username: username,
            password: password
         },
        success: goToLoggedPage
    })
}

goToLoggedPage = (data) => {
    console.log('HERE')
    if (data.success) {
        window.location.href = '/professor'
    } else {
        $('#msgAlertUsuario').show();
    }
}

