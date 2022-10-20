const models = [
  require('./tenant').default,
  require('./auditLog').default,
  require('./user').default,
  require('./bundle').default,
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}
