
module.exports = {
    checkPostParams : function (usrOnBody) {
        if(usrOnBody.name === undefined 
            || usrOnBody.lastname === undefined
            || usrOnBody.username === undefined
            || usrOnBody.email === undefined
            || usrOnBody.password === undefined
            || usrOnBody.exams === undefined){
                return false;
            }
        return true;
    }
}