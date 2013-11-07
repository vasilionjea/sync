// 2-way data binding with jQuery
// Thanks to: lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript
;(function ($, window, undefined) {
  
  var o = $({}); // github.com/cowboy/jquery-tiny-pubsub
  $.subscribe = function() { o.on.apply(o, arguments); };
  $.unsubscribe = function() { o.off.apply(o, arguments); };
  $.publish = function() { o.trigger.apply(o, arguments); };

  $.sync = function Sync (model) {
    var sync = 'sync-';
    var change_msg = model + ':change';

    // Listen for changes on elements with a "data-sync-{model}" attribute.
    // Publish a change event passing associated data & new value.
    $(document).on('change', '[data-' + sync + model + ']', function (e) { console.log('change: 0');
      var $input = $(this);

      $.publish(change_msg, [$input.data(sync + model), $input.val(), $input]);
    });

    /* 
      Catch the changes here!

      Changing the View we get:
      change: 0
      change: 1
      change: 2
    */    
    $.subscribe(change_msg, function (e, model_prop, new_val, initiator) {
      // Find elements that are bound to model's property
      $('[data-' + sync + model + '="' + model_prop + '"]').each(function () { console.log('change: 1');
        var $elem = $(this);

        if ($elem.is('input, textarea, select')) {
          $elem.val(new_val);
        } else {
          $elem.text(new_val);
        }
      });
    });
  };
}(jQuery, this));