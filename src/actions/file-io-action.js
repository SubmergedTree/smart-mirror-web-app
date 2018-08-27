
export const FILEIO = {
    FILE_IO_SUPPORTED: 'FILE_IO_SUPPORTED',
    ADD_IMAGE: "ADD_FILES"
};


export function checkIfFileApiIsSupported() {
    const apiSupportedResult = window.File && window.FileReader && window.FillList;
    return {
        type: FILEIO.FILE_IO_SUPPORTED,
        apiSupported: apiSupportedResult
    };
}

function makeImageOwnerPair(image, owner) {
    return {
        imageOwnerPair: {
            image,
            owner
        }
    };
}

export function addFiles(files, owner) {
    const pairs = []
    for (let i = 0; i < files.length; i++) {
        pairs.push(makeImageOwnerPair(files[i], owner))
    }   
    return {
        type: FILEIO.ADD_IMAGE,
        imageOwnerPairs: pairs
    }
}

/*export function addFiles(files, owner) {
    return dispatch => {
        const readerList = [];
        for (let i = 0; i < files.length; i++) {
            let newReader = new FileReader();
            readerList.push(newReader);
            newReader.onload = (e) => {
                const image = newReader.result;
                dispatch(storeImage(image, owner))
            }
            newReader.readAsDataURL(files[i]);
        }
    }
}*/

export function deleteImageByIndex(index) {

}