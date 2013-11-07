// An example of a model
var User = (function ($, window, undefined) {
  // A User model...
  function User(model_id) {
    var user = {
      attrs: {},
      _id: '',

      init: function () {
        this._id = model_id;

        // Sync this model with views using its properties
        $.sync(this._id);

        this.events();

        return this;
      },

      events: function () {
        var instance = this;

        // Subscribe to changes initiated only from views.
        $.subscribe(instance._id + ':change', function(e, name, val, initiator) {
          if (initiator !== instance) { console.log('change: 2');
            // do not use set() because more events than expected are triggered
            instance.attrs[name] = val;
          }
        });
      },

      /*
        Changing the model we get:
        change: 3
        change: 1
      */
      set: function(name, val) { console.log('change: 3');
        this.attrs[name] = val;

        // Publish that a property of this model was changed
        $.publish(this._id + ':change', [name, val, this]);
      },

      get: function(name) {
        return this.attrs[name];
      }
    };

    return user.init();
  }

  return User;
}(jQuery, this));