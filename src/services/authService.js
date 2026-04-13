import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const authConfig = {
  authority: "https://cboi-auth-stage.isupay.in/application/o/merchant-web-application/",
  client_id: "02WnEFxSElzxzrv3Qht29IacaiO6qKa3pclXleoo",
  redirect_uri: "http://localhost:3000/callback",
  post_logout_redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "openid profile email offline_access authorities privileges user_name created adminName bankCode goauthentik.io/api",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const userManager = new UserManager(authConfig);

export const login = () => userManager.signinRedirect();
export const logout = () => userManager.signoutRedirect();
export const getUser = () => userManager.getUser();
export const signinCallback = () => userManager.signinCallback();
