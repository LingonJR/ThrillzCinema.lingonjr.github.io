// Build script for GitHub Pages deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Run the standard build process
console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Path to the built files
const distDir = path.join(__dirname, '..', 'dist', 'public');

// Create a 404.html file that redirects to index.html for SPA routing
const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <script>
    // Single Page Apps for GitHub Pages
    // https://github.com/rafgraph/spa-github-pages
    // This script takes the current url and converts the path and query
    // string into just a query string, and then redirects the browser
    // to the new url with only a query string and hash fragment
    
    // If you're creating a Project Pages site and NOT using a custom domain,
    // then set pathSegmentsToKeep to 1 (enterprise users may need to set it to > 1).
    // This way the code will only replace the route part of the path, and not
    // the real directory in which the app resides, for example:
    // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
    // https://username.github.io/repo-name/?/one/two&a=b~and~c=d#qwe
    // Otherwise, leave pathSegmentsToKeep as 0.
    var pathSegmentsToKeep = 1;

    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
`;

// Create a script to redirect from index.html
const redirectScript = `
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // Single Page Apps for GitHub Pages
    // https://github.com/rafgraph/spa-github-pages
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct url and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new url.
    // When the single page app is loaded further down in this file,
    // the correct url will be waiting in the browser's history for
    // the single page app to route accordingly.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
`;

try {
  // Create 404.html
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
  console.log('Created 404.html for SPA routing');

  // Read and modify index.html to add the redirect script
  const indexPath = path.join(distDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace('<head>', '<head>' + redirectScript);
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Updated index.html with redirect script');

} catch (error) {
  console.error('Error creating SPA routing files:', error);
  process.exit(1);
}

console.log('GitHub Pages build completed successfully!');