import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";
import { Preferences } from '@capacitor/preferences';

async function initDB() {
   try {
      const sqlite = new SQLiteConnection(CapacitorSQLite);
      const platform = Capacitor.getPlatform();
      const NAME_DB = "reporte"; // Nombre de la base de datos
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

export default initDB;