const pathname = window.location.pathname;
// console.log(pathname);

switch (pathname) {
    case '/':
    case '/index.html':
        history.pushState({}, null, '/');
        break;
    case '/work':
    case '/work.html':
        history.pushState({}, null, '/');
        break;
    case '/404':
    case '/404.html':
    default:
        history.pushState({}, null, '/404');
        break;
}

