import { Sequelize } from "sequelize";
import { hash } from "bcryptjs";

// Cria instância do Sequelize
const dbConfig = require("../config/database");
const sequelize = new Sequelize(dbConfig);

// Importa os models
import { User } from "../models/User"; // ajuste conforme a estrutura real
import { Company } from "../models/Company"; // exemplo adicional

async function runSeed() {
    try {
        const passwordHash = await hash(process.env.DEFAULT_PASS ?? "123456", 8);
        await sequelize.authenticate();
        console.log("✅ Conexão com o banco estabelecida.");

        // Exemplo de seed
        const company = await Company.create({
            name: "Integracore",
            email: "contato@integracore.com.br",
        });

        await User.create({
            name: "Admin",
            email: process.env.DEFAULT_EMAIL ?? "admin@admin.com",
            password: passwordHash,
            companyId: company.id,
            profile: "admin",
        });

        console.log("🌱 Seed aplicada com sucesso.");
        await sequelize.close();
    } catch (error) {
        console.error("❌ Erro ao aplicar seed:", error);
        process.exit(1);
    }
}

runSeed();
