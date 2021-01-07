const TOKEN_KEY = 'Hope-Up-Admin';
export const login = (data) => {
    localStorage.setItem(TOKEN_KEY, data);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}