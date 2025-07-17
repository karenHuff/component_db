# Integrar capacitor a tu proyecto de React
```
   npm install @capacitor/core @capacitor/cli
   npx cap init
```

## Agregar plugin para SQLite
```
   npm i @capacitor-community/sqlite
   npm i @capacitor/preferences
```

## Configurar capacitor para android
```
   npm i @capacitor/android
   npx cap add android
```

### Verificar que se esté utilizando JDK 21
```
   minSdkVersion = 23
   compileSdkVersion = 35
   targetSdkVersion = 35
```

En la carpeta public del proyecto agregar la base de datos en: assets/databases/name_db.db

## Cofigurar proyecto para usar SQLite desde android
```
   import { Capacitor } from "@capacitor/core";
   import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
   import { Preferences } from '@capacitor/preferences';

   async function initDB() {
      try {
         const sqlite = new SQLiteConnection(CapacitorSQLite);
         const platform = Capacitor.getPlatform();
         const NAME_DB = "name_db"; // Nombre de la base de datos
         const VERSION_DB = "1"; // Versión de la base de datos

         if (platform === 'android') {
            const { value: versions } = await Preferences.get({ key: 'dbCopied' });

            // Copiar base de datos desde assets solo una vez
            if (versions !== VERSION_DB) {
               await sqlite.copyFromAssets();
               await Preferences.set({ key: 'dbCopied', value: VERSION_DB });
               alert("Base de datos copiada desde assets.");
            }

            // Crear conexión a la base de datos
            const db = await sqlite.createConnection(NAME_DB, false, 'no-encryption', 1);
            await db.open();
            
            // Verificar que se haya establecido la conexión
            if ((await db.isDBOpen()).result) {
               alert('Conexión establecida.');
            }
         }
      } catch (error) {
         alert('Ocurrió un error.');
      }
   }
```

## Correr proyecto para modo desarrollo (debug)
```
   npm run build
   npx cap sync
   npx cap run android
```