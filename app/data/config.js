export function getEndpoint(endpoint) {
    const slug = "http://45.79.90.235/" //"http://10.0.2.2:5000/"
    return slug.concat(endpoint)
}

export function formatParams(key, value, first = false) {
    if (first) {
        return "?".concat(key.toString(), "=", value.toString())
    } else{
        return "&".concat(key.toString(), "=", value.toString())
    }
}
