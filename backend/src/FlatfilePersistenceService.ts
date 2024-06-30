import PersistenceService from './PersistenceService';
import fs from "fs";
import path from "path";

export default class FlatfilePersistenceService implements PersistenceService {

    constructor() {
        if (!fs.existsSync(this.getPath("flatfileDb"))) {
            fs.mkdirSync(this.getPath("flatfileDb"));
        }      
    }
    
    async create(name: string): Promise<void> {
        if (fs.existsSync(this.getPath(`flatfileDb`, `${name}.json`))) {
            return;
        }
      
        fs.writeFileSync(this.getPath(`flatfileDb`, `${name}.json`), "");      
    }

    async insert<T>(content: T, location: string): Promise<void> {

    }

    private getPath(...dir: string[]) {
        return path.join(__dirname, ...dir);
    }
}