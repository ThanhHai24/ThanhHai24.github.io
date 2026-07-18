export function debounce(callback, delay = 500) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    };
}

export function truncate(text, length = 150) {
    if (!text) return "";

    return text.length > length
        ? text.slice(0, length) + "..."
        : text;
}