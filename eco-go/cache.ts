import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { TokenCache } from '@clerk/clerk-expo/dist/cache'


// Используем localStorage на вебе
const createTokenCache = (): TokenCache => {
  return {
    
    getToken: async (key: string) => {
      try {
        if (Platform.OS === 'web') {
          const item = localStorage.getItem(key)
          if (item) console.log(`${key} взят из localStorage 🔐`)
          else console.log(`Нет значений под ключом: ${key}`)
          return item
        } else {
          const item = await SecureStore.getItemAsync(key)
          if (item) console.log(`${key} взят из SecureStore 🔐`)
          else console.log(`Нет значений под ключом: ${key}`)
          return item
        }
      } catch (error) {
        console.error('Ошибка получения токена: ', error)
        return null
      }
    },
    saveToken: (key: string, token: string) => {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, token)
      } else {
        return SecureStore.setItemAsync(key, token)
      }
    },
  }
}

export const tokenCache = createTokenCache()
