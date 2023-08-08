function reCaptcha(callback=()=>{}){
    grecaptcha.ready(function(){
        grecaptcha
            .execute(window.RECAPTCHA_KEY, {action: "submit"})
            .then(function(token){
                callback(token)
            })
    })
}

export {
    reCaptcha,
}
