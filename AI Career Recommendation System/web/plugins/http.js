let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.map((callback) => callback(token));
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

export default defineNuxtPlugin(async (nuxtApp) => {
  let isUrl = (path) => {
    return path.includes("http://") || path.includes("https://");
  };

  const http = {
    get: async (path, config) => {
      let options = {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (config) {
        if (config.headers) {
          options.headers = config.headers;

          if (config.headers.contentType) {
            options.headers["Content-Type"] = config.headers.contentType;
          } else if (config.headers["Content-Type"]) {
            options.headers["Content-Type"] = config.headers["Content-Type"];
          } else if (config.headers["content-type"]) {
            options.headers["Content-Type"] = config.headers["content-type"];
          } else {
            options.headers["Content-Type"] = "application/json";
          }

          if (config.headers.authorization) {
            options.headers["Authorization"] = config.headers.authorization;
          } else if (config.headers["authorization"]) {
            options.headers["Authorization"] = config.headers["authorization"];
          } else if (config.headers["Authorization"]) {
            options.headers["Authorization"] = config.headers["Authorization"];
          }
        }
      }

      path = `${
        isUrl(path) ? "" : useRuntimeConfig().public.API_URL + "/api"
      }${path}`;

      let res = await fetch(path, options);

      let data = await res.json();

      return data;
    },
    post: async (path, body, config) => {
      let options = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      if (config) {
        if (config.headers) {
          options.headers = config.headers;

          if (config.headers.contentType) {
            options.headers["Content-Type"] = config.headers.contentType;
          } else if (config.headers["Content-Type"]) {
            options.headers["Content-Type"] = config.headers["Content-Type"];
          } else if (config.headers["content-type"]) {
            options.headers["Content-Type"] = config.headers["content-type"];
          } else {
            options.headers["Content-Type"] = "application/json";
          }

          if (config.headers.authorization) {
            options.headers["Authorization"] = config.headers.authorization;
          } else if (config.headers["authorization"]) {
            options.headers["Authorization"] = config.headers["authorization"];
          } else if (config.headers["Authorization"]) {
            options.headers["Authorization"] = config.headers["Authorization"];
          }
        }
      }

      path = `${
        isUrl(path) ? "" : useRuntimeConfig().public.API_URL + "/api"
      }${path}`;

      let res = await fetch(path, options);

      let data = await res.json();

      return data;
    },
    put: async (path, body, config) => {
      let options = {
        method: "put",
      };

      if (body) {
        options.body = JSON.stringify;
      }

      if (config) {
        if (config.headers) {
          options.headers = config.headers;

          if (config.headers.contentType) {
            options.headers["Content-Type"] = config.headers.contentType;
          } else if (config.headers["Content-Type"]) {
            options.headers["Content-Type"] = config.headers["Content-Type"];
          } else if (config.headers["content-type"]) {
            options.headers["Content-Type"] = config.headers["content-type"];
          } else {
            options.headers["Content-Type"] = "application/json";
          }

          if (config.headers.authorization) {
            options.headers["Authorization"] = config.headers.authorization;
          } else if (config.headers["authorization"]) {
            options.headers["Authorization"] = config.headers["authorization"];
          } else if (config.headers["Authorization"]) {
            options.headers["Authorization"] = config.headers["Authorization"];
          }
        }
      }

      path = `${
        isUrl(path) ? "" : useRuntimeConfig().public.API_URL + "/api"
      }${path}`;

      let res = await fetch(path, options);

      let data = await res.json();

      return data;
    },
    delete: async (path, body, config) => {
      let options = {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      if (config) {
        if (config.headers) {
          options.headers = config.headers;

          if (config.headers.contentType) {
            options.headers["Content-Type"] = config.headers.contentType;
          } else if (config.headers["Content-Type"]) {
            options.headers["Content-Type"] = config.headers["Content-Type"];
          } else if (config.headers["content-type"]) {
            options.headers["Content-Type"] = config.headers["content-type"];
          } else {
            options.headers["Content-Type"] = "application/json";
          }

          if (config.headers.authorization) {
            options.headers["Authorization"] = config.headers.authorization;
          } else if (config.headers["authorization"]) {
            options.headers["Authorization"] = config.headers["authorization"];
          } else if (config.headers["Authorization"]) {
            options.headers["Authorization"] = config.headers["Authorization"];
          }
        }
      }

      path = `${
        isUrl(path) ? "" : useRuntimeConfig().public.API_URL + "/api"
      }${path}`;

      let res = await fetch(path, options);

      let data = await res.json();

      return data;
    },
  };

  return {
    provide: {
      http,
    },
  };
});
