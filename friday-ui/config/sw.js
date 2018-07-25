// config/sw.js
module.exports = {
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  staticFileGlobs: [
    'build/**/*'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^(?!\/api\/).*/],
  cacheId: 'my-friday-build-magic'
}
