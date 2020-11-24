export function getSellerId() {
    let si = localStorage.getItem('si');
    if(si) {
        si = JSON.parse(si);
        if(si && si.id > 0) {
            return si.id;
        }
    }
    return 0;
}

export function getSellerName() {
    let si = localStorage.getItem('si');
    if (si) {
        si = JSON.parse(si);
        if (si) {
            return si.name;
        }
    }
    return 0;
}

export function getLoginName() {
    let si = localStorage.getItem('si');
    console.log(si)
    if (si) {
        si = JSON.parse(si);
        if (si) {
            return si.eName;
        }
    }
    return 0;
}