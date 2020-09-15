function addCustomerIdToAccessToken(user, context, callback) {
  const namespace = "http://pret/customerIddd";
  if (user && user.app_metadata && user.app_metadata.pret_customer_id && context && context.accessToken) {
    context.accessToken[namespace] = user.app_metadata.pret_customer_id;
  }
  return callback(null, user, context);
}