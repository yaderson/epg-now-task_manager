function timeDuration(dateBeging, dateEnd){
    let seconds = (dateEnd - dateBeging)/1000
    let hoursf = Math.floor(seconds/3600)
    let hours = seconds/3600
    let minutes = Math.floor((hours-hoursf)*60)
    let final = ''
    final += hoursf>0?hoursf+' h ':''
    final +=minutes > 0?minutes+' m':''
    return final
}

module.exports = {
    timeDuration
}