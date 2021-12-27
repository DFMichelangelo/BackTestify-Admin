const Endpoints = {
  auth: {
    signup: "/v1/auth/signup", // ? POST
    login: "/v1/auth/login", // ? POST
    activation: "/v1/auth/activation/:activationCode", // ? POST
    lostPasswordEmail: "/v1/auth/lost-password-mail", // ? POST
    passwordReset: "/v1/auth/password-reset", // ? POST
    newAccessToken: "/v1/auth/token", // ? POST
    logout: "/v1/auth/logout", // ? DELETE
    token: "/v1/auth/token", // ? POST
  },
  user: {
    profile: "/v1/app/user/info", // ? GET
    editProfile: "/v1/app/user/edit", // ? GET
    disableAccount: "v1/app/user/disable", // ? DELETE
    getAll: "v1/admin/user/info/all", // ? GET
    getById: "v1/admin/user/info/:id", // ? GET
    editByAdmin: "v1/admin/user/edit", // ? PUT
    create: "v1/admin/user/create", // ? POST
    sendActivationEmail: "v1/admin/user/send-activation-email/:id", // ? POST
    sendLostPasswordEmail: "v1/admin/user/send-lost-password-email/:id", // ? POST
    impersonificate: "v1/admin/user/impersonificate/:id" // ? POST
  },
  debug: {
    status: "/v1/debug/status/:status", // ? GET
  },
  database: {
    tablesSize: "/v1/admin/database/tables-size" // ? GET
  },
  feedback: {
    sendNew: "/v1/app/feedback/create", // ? POST
    getAll: "/v1/admin/feedback/all", // ? GET
    deleteById: "/v1/admin/feedback/delete/:id", // ? DELETE
    editById: "/v1/admin/feedback/edit", // ? PUT

  },
  logs: {
    getAll: "/v1/admin/logs/" // ? GET
  },
  generalSettings: {
    editGeneralSetting: "/v1/admin/general-settings/", // ? PUT
    getGeneralSetting: "/v1/admin/general-settings/:feature"// ? GET
  },
  tos: {
    getPrivacyPolicy: "/v1/app/gdpr/privacy-policy",
    getTermsAndConditions: "/v1/app/gdpr/terms-and-conditions"
  }
};

export default Endpoints;
