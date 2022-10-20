const backendUrl = `http://146.19.207.88:8080/api`;

/**
 * Frontend Url.
 */
const frontendUrl = {
  host: '146.19.207.88:3000',
  protocol: 'http',
};

/**
 * Tenant Mode
 * multi: Allow new users to create new tenants.
 * multi-with-subdomain: Same as multi, but enable access to the tenant via subdomain.
 * single: One tenant, the first user to register will be the admin.
 */
const tenantMode = 'single';

export default {
  frontendUrl,
  backendUrl,
  tenantMode,
};
