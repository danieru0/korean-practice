export default counter => {
    if (counter < 9) {
        return '0' + (counter + 1);
    } else {
        return (counter + 1).toString();
    }
}