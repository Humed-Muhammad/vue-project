migrate((db) => {
  const collection = new Collection({
    "id": "6coc52sopy7250q",
    "created": "2024-04-17 20:54:40.764Z",
    "updated": "2024-04-17 20:54:40.764Z",
    "name": "todos",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ftwasoru",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9oos9rog",
        "name": "completed",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6coc52sopy7250q");

  return dao.deleteCollection(collection);
})
