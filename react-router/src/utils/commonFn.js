function getQueryParams(curParam) {
    let query = window.location.hash.split('?')[1];
    let items = query.split('&');
    for (let i = 0; i < items.length; i++) {
        let pair = items[i].split('=');
        if (pair[0] === curParam) {
            return pair[1];
        }
    }
    return false;
}

function getCookie (key) {
    let arr = document.cookie.split(';');
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] === key) {
            return arr2[1];
        }
    }
    return false;
}
export default {getQueryParams, getCookie};