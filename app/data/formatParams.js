export default function formatParams(url, params) {
    function concatParam (key, value, first = false) {
    if (first) {
        return "?".concat(key.toString(), "=", value.toString())
        } else{
            return "&".concat(key.toString(), "=", value.toString())
        }
    }
    var returnUrl = url

    if (params){
        returnUrl = returnUrl.concat(concatParam(params[0].key, params[0].value, true))
        if (params.length > 1) {
            var i;
            for (i = 1; i < params.length; i++){
                returnUrl = returnUrl.concat(concatParam(params[i].key, params[i].value))
            }}}
    return returnUrl
}
