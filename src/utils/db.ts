const logger = window.getLogger('utils_db')
function createTabs(db: IDBDatabase, transaction: IDBTransaction | null) {
  const tabs = [
    { name: 'msgs', keys: ['msgId', 'txt'] },
    { name: 'chats', keys: ['chatId'] },
    { name: 'users', keys: ['name', 'account'] },
    { name: 'groups', keys: ['name', 'groupId'] },
    { name: 'members', keys: ['groupId'] },
  ]
  tabs.forEach(item => {
    if (!db.objectStoreNames.contains(item.name)) {
      const objectStore = db.createObjectStore(item.name, { autoIncrement: true })
      item.keys.forEach(item => {
        objectStore.createIndex(item, item)
      })
    } else if (transaction) {
      tabs.forEach(item => {
        const objectStore = transaction.objectStore(item.name)
        item.keys.forEach(key => {
          if (!objectStore.indexNames.contains(key)) {
            objectStore.createIndex(key, key)
          }
        })
      })
    }
  })
}
let db: IDBDatabase
export function initialDb(account: string) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (db) {
      resolve(db)
      return
    }
    const dbName = 'im_db_' + account
    const version = 9
    const request = indexedDB.open(dbName, version)
    request.onsuccess = function () {
      db = this.result // 数据库对象
      logger.info('db open success')
      resolve(db)
    }

    request.onerror = function () {
      logger.error('db open error')
      reject(null)
    }

    request.onupgradeneeded = function (evt) {
      // 数据库创建或升级的时候会触发
      logger.info('onupgradeneeded', version)
      db = this.result // 数据库对象
      const transaction = request.transaction
      createTabs(this.result, transaction)
      resolve(db)
    }
  })
}

export function addData(storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    let request = db.transaction([storeName], 'readwrite').objectStore(storeName).add(data)

    request.onsuccess = function (event) {
      resolve(event)
    }

    request.onerror = function (event) {
      reject(event)
    }
  })
}
