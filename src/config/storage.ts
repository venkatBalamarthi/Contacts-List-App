import AsyncStorage from '@react-native-async-storage/async-storage'

const getItem = (key: string): any => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await AsyncStorage.getItem(key)
            resolve(JSON.parse(`${data}`))
        }
        catch (e) {
            reject(e)
        }
    })
}

const setItem = (key: string, data: any) => {

    return new Promise( async (resolve, reject) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data))
            resolve({
                message: "Successfull"
            })
        }
        catch (e){
            reject(e)
        }
    })
}

const multiget = (keys: string[]) => {
    return new Promise( async (resolve, reject) => {
        try {
            const datas = await AsyncStorage.multiGet(keys)
            const arrayDatas = datas?.map(data => {
                return JSON.parse(`${data[1]}`);
            })
            resolve(arrayDatas)
        }
        catch (e){
            reject(e)
        }
    })
}

const asyncStorage = {
    setItem: setItem,
    getItem: getItem,
    multiGet: multiget,
    clearStorage: AsyncStorage.clear,
    removeItem: AsyncStorage.removeItem
}

export default asyncStorage
