import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({
	connection: { url: 'file:crontainer.db', authToken: 'L6auKUiH1LWf4G' }
});
