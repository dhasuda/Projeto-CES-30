$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow")
 })

 $(document).ready(() => {
     $('#register-form').submit(e => {
        var username = $('#register-username').val()
        var password = $('#register-password').val()
        register(username, password)
     })

     $('#login-form').submit(e => {
        var username = $('#login-username').val()
        var password = $('#login-password').val()
        login(username, password)
    })
 })

register = (username, password) => {
    console.log(username)
    console.log(password)
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

login = (username, password) => {
    console.log(username)
    console.log(password)
    var url = '/register';

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
    console.log(data)
}

