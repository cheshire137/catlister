import db from '../src/core/db';

function setupDatabase() {
  const drop = 'DROP TABLE IF EXISTS session;';
  const columns = '"sid" varchar NOT NULL COLLATE "default", ' +
      '"sess" json NOT NULL, "expire" timestamp(6) NOT NULL';
  const create = `CREATE TABLE "session" (${columns}) WITH (OIDS=FALSE);`;
  const alter = 'ALTER TABLE "session" ADD CONSTRAINT "session_pkey" ' +
      'PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;';
  const sql = `${drop} ${create} ${alter}`;
  return db.none(sql).then(() => {
    console.log('Finished initializing database');
  }).catch(error => {
    console.log('Failed to initialize database', error);
  });
}

setupDatabase().then(() => {
  process.exit();
});

export default setupDatabase;
