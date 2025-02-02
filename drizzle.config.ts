import { defineConfig } from 'drizzle-kit';
export default defineConfig({
	dialect: 'sqlite',
	schema: './src/db/_schema.ts',
	dbCredentials: {
		url: 'file:crontainer.db',
		token: 'L6auKUiH1LWf4G'
	}
});
