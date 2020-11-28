import AsyncStorage from '@react-native-async-storage/async-storage';

async function cacheData(data, key) {
    const nowTimestamp = Math.round(Date.now() / 1000);
    storageObject = {data: data, cacheTimestamp: nowTimestamp}
    const stringified = JSON.stringify(storageObject)
    await AsyncStorage.setItem(key, stringified)
}

async function getData(key){
    const nowTimestamp = Math.round(Date.now() / 1000);
    const cachedValue = await AsyncStorage.getItem(key)
    if(cachedValue == null) {
        return false
    } else{
        storageObject = JSON.parse(cachedValue)
        refreshCache = (nowTimestamp - storageObject.cacheTimestamp > 600) ? true:false
    }
    return storageObject
}

async function clearCache(key){
    await AsyncStorage.removeItem(key)
}

export default {cacheData, getData, clearCache}
