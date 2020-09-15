const rule = require('../../rules/add-customer-id-to-access-token');

describe('addCustomerIdToAccessToken', () => {
  const namespace = "http://pret/customerId";
  const initialAccessToken = { someKey: 'some-initial-value' };
  let user;
  let context;

  beforeEach(() => {
    user = { app_metadata: { pret_customer_id: 'some-customer-id-value' } };
    context = { accessToken: initialAccessToken };
  });

  it('should add customerId to existing accessToken', (done) => {
    rule(user, context, (err, u, c) => {
      expect(c.accessToken[namespace]).toBe(user.app_metadata.pret_customer_id);
      expect(c.accessToken['someKey']).toBe('some-initial-value');
      done();
    });
  });

  it('should add customerId to empty accessToken', (done) => {
    context.accessToken = {};
    rule(user, context, (err, u, c) => {
      expect(c.accessToken[namespace]).toBe(user.app_metadata.pret_customer_id);
      done();
    });
  });

  it('should do nothing if there is no context', (done) => {
    context = undefined;
    rule(user, context, (err, u, c) => {
      expect(c).toBe(undefined);
      done();
    });
  });

  it('should do nothing if there is no accessToken', (done) => {
    context = {};
    rule(user, context, (err, u, c) => {
      expect(c.accessToken).toBe(undefined);
      done();
    });
  });

  it('should do nothing if there is no user', (done) => {
    user = null;
    rule(user, context, (err, u, c) => {
      expect(c.accessToken).toEqual(initialAccessToken);
      done();
    });
  });

  it('should do nothing if there is no user app metadata', (done) => {
    user.app_metadata = undefined;
    rule(user, context, (err, u, c) => {
      expect(c.accessToken).toEqual(initialAccessToken);
      done();
    });
  });

  it('should do nothing if there is no pret customer id', (done) => {
    user.app_metadata.pret_customer_id = undefined;
    rule(user, context, (err, u, c) => {
      expect(c.accessToken).toEqual(initialAccessToken);
      done();
    });
  });
});