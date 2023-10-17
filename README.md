

# AIRPORT BD -- steps to run the backend

1. clone -->  https://github.com/castilloxavie/API-AIRPORT

2. run the following command
   ```
   npm install
   ```

3. clone the env.template file and rename it to .env and add the environment variables

4. run the following command to raise the database with docker
    ```
    docker-compose up -d
    ```

5. (optional) If you do not have docker, you must create the database from your computer, you must have postgresql


6. rum the  command
    ```
    npm run dev
    ```