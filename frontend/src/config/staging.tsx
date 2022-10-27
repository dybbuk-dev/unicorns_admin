// Place the URL here with the /api suffix.
// Ex.:`https://domain.com/api`;
const backendUrl = `http://185.250.36.52:8080/api`;

/**
 * Frontend URL.
 */
const frontendUrl = {
  host: 'http://185.250.36.52:3000/api',
  protocol: 'https',
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
