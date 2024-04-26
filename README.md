# ** TYVC Platform **

Welcome to the TYVC Platform!

This project uses [bun](https://bun.sh/) to run.

## Prerequisites
Before running the project, make sure you have bun installed on your system. You can install bun by following the instructions on the official [bun installation guide](https://bun.sh/).

## Dependencies
In order to run the project successfully you have to include some external dependencies and include the credentials. You can find an env.template in the repo

Here are some of the dependencies in more detail

### Database
The project uses a PostgresQL [https://supabase.com/](Supabase). Go to Settings -> CONFIGURATION -> Connection string
To decrease database load and reduce query latency the project uses [https://www.prisma.io/data-platform/accelerate](PrismaAccelerate)

### Email Service
As an Email Provider which is used for notifications and sso login the project usese [https://resend.com/home](Resend)

### Algolia
The Investor search is powered by Algolia. 
Setup an Index For the BusinessAngel, Employee, Fund. The data between the Database and the Algolia Index is synced in the src/pages/api/v1/admin/algolia/sync

### External CMS 
To connect to the external CMS System built with [https://payloadcms.com/](Payload), hosted in the Payload Cloud use the url of your deployed Payload project. 
The CMS sends data to the Platform using the Handlers in scr/server/handlers


## Running the Project
To run the project with bun, navigate to the project directory in your terminal and execute the following command:

`bun dev`
