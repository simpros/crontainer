import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

const url = process.env.DB_URL;
if (!url) {
	throw new Error('DB_URL is not set');
}

const token = process.env.DB_TOKEN;
if (!token) {
	throw new Error('DB_TOKEN is not set');
}

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/_schema.ts',
	dbCredentials: {
		url,
		token
	}
});
