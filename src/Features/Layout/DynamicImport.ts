export function loadFooter() {
    return import("./Footer").then(({ AppFooter }) => ({ default: AppFooter }));
}

export function loadUserMenu() {
    return import("./UserMenu").then(({ AppUserMenu }) => ({ default: AppUserMenu }));
}

export function loadNav() {
    return import("./Nav").then(({ AppNav }) => ({ default: AppNav }));
}
