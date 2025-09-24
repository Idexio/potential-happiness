import { Sequelize } from "sequelize";
import { Umzug } from "umzug";
import { SequelizeStorage } from "umzug/lib/storage/sequelize";

// Cria instância do Sequelize
const dbConfig = require("../config/database");
const sequelize = new Sequelize(dbConfig);

// Configura o Umzug para gerenciar as migrações
const migrator = new Umzug({
    migrations: {
        glob: "src/database/migrations/*.ts", // caminho dos arquivos de migração
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

// Executa as migrações
async function runMigrations() {
    try {
        await sequelize.authenticate();
        console.log("Conexão com o banco estabelecida.");

        const pending = await migrator.pending();
        if (pending.length === 0) {
            console.log("Nenhuma migração pendente.");
        } else {
            await migrator.up();
            console.log("Migrações aplicadas com sucesso.");
        }

        await sequelize.close();
    } catch (error) {
        console.error("Erro ao aplicar migrações:", error);
        process.exit(1);
    }
}

runMigrations();
