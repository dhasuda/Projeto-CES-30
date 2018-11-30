exports.getDateTime = function(){
    var date = convertDateToUTC(new Date());

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

exports.revertToUTC = function(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    
    newDate.setHours(hours - offset);
    
    return newDate;   
}

function convertDateToUTC(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    
    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();
    
    newDate.setHours(hours + offset);
    
    return newDate;   
}