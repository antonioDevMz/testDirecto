const buildJson = async (data) => {
    let oCreated = data.map(function(item) {
        let obj = item.map(function(letter) {
            return  { letter: letter, used: false };
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

const addCoordinates = async(array, oArray, sumArray, sumObjs) => {

    for (let i=0; i < array.length; i++) {
        let obj     = array[i];
        obj.array !=0 ? oArray[obj.array -1][obj.index].index = obj.index : { letter: 0};
        obj.array !=0 ? oArray[obj.array -1][obj.index].array = obj.array -1 : { letter: 0};
        obj.above   = obj.array != 0 ? oArray[obj.array -1][obj.index] : { letter: 0};

        obj.array == sumArray-1 ? { letter: 0} : oArray[obj.array+1][obj.index].index = obj.index;
        obj.array == sumArray-1 ? { letter: 0} : oArray[obj.array+1][obj.index].array = obj.array+1;
        obj.down    = obj.array == sumArray-1 ? { letter: 0} : oArray[obj.array+1][obj.index];

        obj.index != 0 ? oArray[obj.array][obj.index-1].index = obj.index-1 : { letter: 0};
        obj.index != 0 ? oArray[obj.array][obj.index-1].array = obj.array : { letter: 0};
        obj.left    = obj.index != 0 ? oArray[obj.array][obj.index-1] : { letter: 0};

        obj.index == sumObjs-1 ? { letter: 0} : oArray[obj.array][obj.index+1].index = obj.index+1;
        obj.index == sumObjs-1 ? { letter: 0} : oArray[obj.array][obj.index+1].array = obj.array;
        obj.right   = obj.index == sumObjs-1 ? { letter: 0} : oArray[obj.array][obj.index+1] ;
    }

    return {oSearch: array, oMap: oArray};
}

const searchMore_ = async(obj, oWord) => {
    console.log(obj, oWord);

    for (let i=1; i < oWord.length; i++) {
        let letter = oWord[i];
        console.log(letter);
    }
};


const searchMore = async(obj, oWord) => {
    var arrayLe = [];
    function recurse(i) {
        if(oWord.length == i+1) {
            return arrayLe;
        } else {
            i ++;
            let element = oWord[i];
            if (obj.above.letter != element && obj.down.letter != element && obj.left.letter != element && obj.right.letter != element) {
                return false;
            }
    
            if (obj.above.letter == element) {
               arrayLe.push(obj.above);
            }
    
            if(obj.down.letter == element){
               arrayLe.push(obj.down);
            }
    
            if(obj.left.letter == element){
               arrayLe.push(obj.left);
            }
    
            if(obj.right.letter == element){
               arrayLe.push(obj.right);
            }

            recurse(i);
            return arrayLe;
        }

    }

    let oRes = await recurse(1);
    return oRes;
};

const searchAdy = async(oMaps, oFilters, oWord, sumArray, sumObjs) => {
    let {oSearch, oMap} = await addCoordinates(oFilters, oMaps, sumArray, sumObjs);

    async function recurse(i) {
        let obj = oSearch[i];
        let res = await searchMore(obj, oWord);
        if (res) {
            return res;
        }
        if(oSearch.length == i+1) {
            return res;
        } else {
            i ++;
            recurse(i);
        }

        return res;
    }

    let oRes = await recurse(0);
    return oRes;
};

const searchWord = async(oMap, word) => {
    let sumArray    = oMap.length;
    let sumObjs     = oMap[0].length;
    let oWord       = [...word];
    var oFirst      = [];
    let oFound      = await searchFirst(oMap, oWord);

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

    async function recurse() {
        let result = await searchAdy(oMap, oFirst, oWord, sumArray, sumObjs);
        if (!result) {
            recurse(result);
            return result;
        }
        else{
            return true;
        }
    }

    let oResp = await recurse();
    return oResp;
};

module.exports = {
    buildJson,
    searchWord
};