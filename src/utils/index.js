const buildJson = async (data) => {
    let oCreated = data.map(function(item) {
        let obj = item.map(function(letter) {
            return  { letter: letter, used: 0 };
        });
        return obj;
    });

    return oCreated;
};

const searchFirst = async(obj, oWord) => {
    let firstLetter = oWord[0];
    let found       = false;

    for (let ind = 0; ind < obj.length; ind++) {
        let it = obj[ind];
        for (let i = 0; i < it.length; i++) {
            if (it[i].letter == firstLetter) {
                it[i].used  = true;
                it[i].array = ind;
                it[i].index = i;
                found       = true;
            }
        }
    }

    return {found, obj};
};

const addCoordinates = async(array, obj, sumArray, sumObjs) => {
    // console.log(array, sumArray, sumObjs, obj);
    for (let index = 0; index < array.length; index++) {
        const obj = array[index];
        obj.above   = obj.array != 0 ? obj.array -1 : null;
        obj.down    = obj.array == sumArray-1 ? null : obj.array + 1;
        obj.left    = obj.index != 0 ? obj.index -1 : null;
        obj.right   = obj.index == sumObjs-1 ? null : obj.index+1 ;
        
    }

    var aa = array[1];
    console.log(aa);
    console.log(obj[aa.above][aa.index]);
    let above = 1;
    return array;
}

const searchMore = async(obj, oWord) => {

    console.log(obj, oWord);
    for (let i=1; i<oWord.length; i++) {
        const element = oWord[i];
        console.log(element);
    }
};

const searchWord = async(obj, word) => {
    let sumArray    = obj.length;
    let sumObjs     = obj[0].length;
    let oWord       = [...word];;
    let oFound      = await searchFirst(obj, oWord);
    var oFirst      =  [];

    if (!oFound.found) {
        return false;
    }

    oFound.obj.forEach(async item => {
        item.forEach(async obj => {
            if (obj.used) {
                oFirst.push(obj);
            }
        })
    });
    
    let addCoor = await addCoordinates(oFirst, obj, sumArray, sumObjs);
    // addCoor.forEach(async obj => {
    //     await searchMore(obj, oWord);
    // });


    // console.log(obj);

    var oo = obj[0]
    // console.log(oo);
    let resultado = oo.findIndex( item => item.letter === 'A' );

    // console.log(resultado);
    // obj.forEach(item => {
    //     let le = item.filter((i) => i.used == 0);
    //     console.log(le);
    // });

};

module.exports = {
    buildJson,
    searchWord
};