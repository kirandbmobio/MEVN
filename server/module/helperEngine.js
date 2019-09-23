
 const helperFunction = {
    checkTrue : function (value,options){
        if(value == 'kiran')
        return options.fn(this);
        else 
        return options.inverse(this);
    }
}
module.exports = helperFunction;