## Updating the Monolith with a Task Entity

To avoid having to update the User entity, we will create a new entity called "Task" that has a "Many-to-One" relationship with the User entity. This Task will have attributes related to the work order. To create this entity, run `yo jhipster: entity Task`. Add the appropriate attributes and then choose to add one relationship. This relationship should be with the entity `User` and the `User` attribute `id` should be used in AngularJS (other options created a "could not find" error). Updating this entity once it is created is challenging, so it should be created in its final form once the correct attributes have been identified.

## Adding a New Work Order

Inside the "web.rest" package there should be a `TaskResource.java` class. This java class allows you to introduce new endpoints to update data or retrieve data. The analysis section (separate project) will make a call to a new endpoint with data about a new work order as data. This endpoint will create a new Task entity based on this data and choose an appropriate User to assign it to.

## Displaying Data

On the dashboard.html webpage, the current User's tasks should be displayed. To retrieve these Tasks, a new endpoint should be added to the `TaskResource.java` file that accepts a User id as a parameter and returns a list of Tasks.
