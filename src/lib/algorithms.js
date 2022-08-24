/**
 * Gets the elements that match the value given.
 * @param {*} list the list where the bounds are searched
 * @param {*} value the value
 * @returns the list with the elements that match the value
 */
export const getElementsBy = (list, value) => {
    let bounds = [0, 0];

    // finding lower bound
    let lo = 0, hi = list.length - 1;
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (
            list[mid]
                .slice(0, value.length)
                .toLowerCase() < 
            value.toLowerCase()
        )
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    bounds[0] = lo;

    // finding higher bound
    lo = 0; hi = list.length - 1;
    while (lo <= hi) {
        let mid = lo + Math.floor((hi - lo) / 2);
        if (
            list[mid]
                .slice(0, value.length)
                .toLowerCase() <=
            value.toLowerCase()
        )
            lo = mid + 1;
        else
            hi = mid - 1;
    }
    bounds[1] = lo;

    return list.slice(bounds[0], bounds[1]);
}