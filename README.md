# todo-app-patrick

## Tests
The End-to-End tests are only supported for chrome currently.

## Offline usage
To test the offline usage I installed a plugin for chrome called "Web Server for Chrome". 
Then I built the application with 
```
yarn run build
```
and selected the generated ```dist``` directory  in the chrome plugin.
Afterwards you can check the "offline" checkbox of the service worker, refresh the page and it will still work.
Additionally, you can install it as a chrome application.