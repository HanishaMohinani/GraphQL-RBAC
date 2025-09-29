const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver, GraphQLError } = require('graphql');

const authDirectiveTypeDefs = `
  directive @auth(requires: String) on FIELD_DEFINITION
`;

function authDirectiveTransformer(schema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')?.[0];
      if (authDirective) {
        const { requires } = authDirective;
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.user) {
            throw new GraphQLError('Not authenticated');
          }
          if (!context.user.roles.includes(requires)) {
            throw new GraphQLError('Not authorized');
          }
          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
}

module.exports = { authDirectiveTransformer, authDirectiveTypeDefs };
