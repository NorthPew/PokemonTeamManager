let list = [
    {
        test: 'Hejsan'
    }, {
        test: 'Hej då'
    }, {
        test: 'Hej hej'
    }
]

let newList = list.filter(idk => {
    console.log('inside filter', idk);
    return idk.test == 'Hej'
})

console.log(newList);