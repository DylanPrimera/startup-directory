import {at, defineMigration, set, setIfMissing, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'author-id-type',
  documentTypes: ["author"],

  migrate: {
    document(doc, context) {
      return at('id', set(doc._id.toString()))
    },
  },
})
