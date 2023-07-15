export const RedirectSignIn = (status: number) => {
    if (status === 401) {
        window.location.href = '/signin'
    }
}

export const RedirectHome = () => {
    window.location.href = '/'
}