export const constants = {
  localStorageUserLoginKey: "bq-auth",

  apiUrl: {
    login: "/login",

    admin: {
      teachers: {
        self: "admin/teachers"
      }
    }
  },

  apiRequestHeaders: {
    default: {
      contentType: "application/json",
      ifModifiedSince: "0",
      cacheControl: "no-cache",
      pragma: "no-cache"
    }
  },

  apiRequestHeaderKeys: {
    contentType: "Content-Type",
    authorization: "Authorization",
    authToken: "X_AUTH_TOKEN",

    ifModifiedSince: "If-Modified-Since",
    cacheControl: "Cache-Control",
    pragma: "Pragma"
  },

  dateFormats: {
    mmddyyyy: "MM-dd-yyyy",
    yyyyMMddHHmmss: "yyyy-MM-dd HH:mm:ss",
    MMDDYYYY_hhmm: "MM/DD/YYYY hh:mm"
  },

  toasterConfig: {
    showCloseButton: false,
    tapToDismiss: true,
    timeout: 5000,
    positionClass: "toast-top-right"
  },

  events: {
    loadTeachersCount: "loadTeachersCount",
    loadStudentsCount: "loadStudentsCount",
    loadSubjectsCount: "loadSubjectsCount",
    loadBatchesCount: "loadBatchesCount",
    loadLoggedInUser: "loadLoggedInUser"
  }
};
