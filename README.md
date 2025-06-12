
# Attendance Backend REST

This is a part of backend (REST API) for taking attendance for employee.




## Features

- Overtime record
- Reimmbursement record
- Payslip generator
- Payroll processing (HR Only Feature)


## Deployment

To deploy this project run, first you have to run this to build things up.

```bash
  npm run build
```

After that run this command to run the application
```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

This is for the database configuration, this project only run on POSTGRESQL. so it is yoo should use dialect postgres.

`DB_USERNAME`

`DB_PASSWORD`

`DB_HOST`

`DB_PORT`

`DB_NAME`

`DB_DIALECT` = postgres

`JWT_SECRET`

Those env files are required if you run this application on local.
## Documentation

[API Documentation](https://www.postman.com/martian-crescent-661759/workspace/public/api/1ec77d63-fa9b-4f3b-a8e4-87a15c703fc8?action=share&creator=25479071)

