function postpad(num, size) {
    num = num.toString();
    while (num.length < size) num = num + "0";
    return num;
}

export {postpad}