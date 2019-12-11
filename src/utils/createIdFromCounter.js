export default counter => {
    if (counter === 0) {
        return counter + 1;
    } else if (counter > 0 && counter < 10) {
        return '0' + (counter + 1);
    } else {
        return counter + 1;
    }
}