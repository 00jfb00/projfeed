const categories = [{
    name: 'Nader1',
    img: require('../../assets/logo.png')
},{
    name: 'Nader2',
    img: require('../../assets/logo.png')
},{
    name: 'Nader3',
    img: require('../../assets/logo.png')
},{
    name: 'Nader4',
    img: require('../../assets/logo.png')
},{
    name: 'Nader5',
    img: require('../../assets/logo.png')
}]

export default () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(categories)
        }, 3000)
    })
}