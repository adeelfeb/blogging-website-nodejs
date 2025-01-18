const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){
    return (req, res, next) =>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
            next()
        }

        try {
            const userPayload = validateToken(tokenCookieValue) 
            req.user = userPayload    
        } catch (error) {
            
        }
        //writing it here so that next function would be called for both conditions
        next()
    }

}

module.exports = {checkForAuthenticationCookie

    
}