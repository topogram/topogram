Meteor.methods({
  /**
  * Update a specific field based on an _id and a collection name
  */
  updateField(collection, _id, field, value) {
    if (collection && _id && field && value) {
      const  Collection = Mongo.Collection.get(collection)
      const toUpdate = {}
      toUpdate[field] = value
      Collection.update({ _id } , { $set:  toUpdate })
    }
  }
})
