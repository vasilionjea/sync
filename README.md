## Sync 

Exploring 2-way Data Binding with jQuery. 

1. Models are synced with `$.sync(this._id);` where `_id` is a human readable unique identifier - usually the name of the model.

2. Views are bound to Model properties with the following syntax: `data-sync-modelname="property_name"`.
Binding the `name` property of a `User` model to a text input looks like this: `<input type="text" data-sync-user="name">`.

