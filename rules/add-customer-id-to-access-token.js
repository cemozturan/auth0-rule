function (user, context, callback) {
    if (user.app_metadata && user.app_metadata.pret_customer_id) {
      context.accessToken["http://pret/customerId"] = user.app_metadata.pret_customer_id;
    }
    return callback(null, user, context);
  }