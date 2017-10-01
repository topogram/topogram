// Register API
// This defines all the collections, publications and methods that the application provides
// as an API to the client.

// config accounts
// import '/imports/accounts.js'

// methods
import '/imports/api/edges/edgesMethods.js'
import '/imports/api/nodes/nodesMethods.js'
import '/imports/api/topograms/topogramsMethods.js'
// import '/imports/api/comments/commentsMethods.js'

// some helpers
import '/imports/api/helpers.js'

// publications
import '/imports/api/topograms/server/publications.js'
import '/imports/api/server/publications.js'

// plugins
import '/imports/version.js'

// JSON API
import '/imports/endpoints'
