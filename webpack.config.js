export const resolve = {
  fallback: {
    "querystring": require.resolve("querystring-es3"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert/"),
    "crypto": require.resolve("crypto-browserify"),
    "path": require.resolve("path-browserify"),
    "tls": false,
    "net": false,
    "zlib": require.resolve("browserify-zlib"),
  }
};
