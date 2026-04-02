# NextJS Learning Track 2026.

## Learning Progress

### 1. To-Do List
I started learning the basics of NextJS by creating a simple to-do list that uses State Management only with no database or storage.

I first learnt app routing where the routes are defined via 2 different approaches (app routing and page routing). But I am more familiar with app routing

#### App Routing

`http://localhost:3000/products` is derived from the file structure `app/products` where `products` is the folder under main folder `app`. 

The folder has a `page.tsx` file which is a server component meaning its rendered in the server. This page.tsx becames a child to the `layout.tsx` file in the `app` folder which defines the layout of the page.

#### How I used App Routing together with Clean Architecture

Clean Architecture (to the best of my ability), is a framework that guides developers to separate concerns such as business logic, data and the presentation of the data and functionality that is possible by the logic.

It helps develops define the business logic and make it independent to the rest of the other things so that when they change the business logic doesnt.

In my folder structure, you may notice that the `app` folder is quite small and only really renders the 'presentation side of the application'. This is because I have implemented a `features` folder that has different modules or features that make up the whole application

For example for the `e-commerce`, whose purpose is to display products and allow users to shop for products. It is made up of three main folders that constitute the layers of Clean Architecture:

1. **Data Layer** - this layer contains data from external sources such as APIs and databases. This data is raw and needs to be formatted/cleaned to fit the business logic application. It is further sub-divided into three more folders:

    * **Datasources** - the apis and databases
    * **Models** - contains mappers which map the raw data to business logic friendly data.
    * **Repositories** - sort of the link between this layer and the domain layer

2. **Domain Layer**- this layer contains the business logic of the application. This is usually in the center of the hierarchy. It is further sub-divided into three more folders
    * **Entities** - defines the 'objects' that the application has such as `Products`, `Users` etc. Describe this objects by defining properties.
    * **Usecases** - defines the methods that manipulate the 'object' and their properties such as `getProducts`, `getUserDetails` etc
    * **Repositories** - link between the data layer and domain layer

3. **Presentation Layer** - this layer contains the UI which the user interacts with to perform various functions (often based around the usecases). It is further sub-divided into three more folders:
    * **Components/Widgets** - defines the modular reusable parts of the UI eg a `ProductCard`
    * **Pages** - defines the pages of the application. Can also be described as the collection of various components or widgets
    * **State Management** - defines hooks that make the pages/widgets dynamic


### Specific Things I have Learnt throughtout my journey