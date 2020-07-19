function urlValidator(value){
    var expression= /(http|ftp(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var regex = new RegExp(expression);

    if((value !== '') && (value.match(regex))){
        return true;
    }
    return false;
}

module.exports = { urlValidator }