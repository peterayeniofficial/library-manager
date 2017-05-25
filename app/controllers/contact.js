import Ember from 'ember';

export default Ember.Controller.extend({

  isValidEmail: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
  isMessageEnoughLong: Ember.computed.gte('message.length', 5),

  isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),

  actions: {
    // action to submit users message
    sendMessage: function() {

      const email = this.get('emailAddress');
      const message = this.get('message');

      const newContact = this.store.createRecord('contact', {email:email, message:message});

      newContact.save().then((response) => {
        var responseMessage = 'To: ' + email + ', Message: ' + message;
        this.set('responseMessage', responseMessage);
        this.set('emailAddress', '');
        this.set('message', '');
      });
    }
  }
});