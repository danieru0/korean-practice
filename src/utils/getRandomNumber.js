export default max => {
    let number = Math.floor(Math.random() * max) + 1;
    if (number < 10) number = `0${number}`;

    return number.toString();
}