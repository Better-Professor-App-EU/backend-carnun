# Better Professor App - Back End

Some notes:
  - If you want to spin up the server locally,
      [ ] clone this project and open it in VS Code,
      [ ] `npm i` to get dependenies,
      [ ] `npm run migrate`,
      [ ] `npm run seed`,
      [ ] create a top-level .env file and add the following code
          ```
            PORT=4000
            DB_ENV=development
            SECRET=ji93f@Pf39di£0ds
          ```
      [ ] and `npm run server`,
    and you should be good to go!
  - If you need dummy login details, the password for "admin" is "1234".
  - Both `timestamp` (of a message) and `deadline` (of a project) are _stringified Date() objects_. To transform them back into Date objets proper, use
    ```js
      const stringifiedDateObject = /* `timestamp` or `deadline` */;
      const dateObject = new Date(JSON.parse(stringifiedDateObject));
    ```

DEPLOYED API: https://bw-better-professor-app-cmp.herokuapp.com/

DOCS FOR DEPLOYED API: https://documenter.getpostman.com/view/8697138/SW7aX7qz?version=latest