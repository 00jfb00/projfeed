const user = {
    name: 'Nader',
    age: 36
}

export default () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(user)
        }, 3000)
    })
}