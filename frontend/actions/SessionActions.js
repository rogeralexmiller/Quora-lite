var AppDispatcher = require("../dispatcher/dispatcher");
var SessionConstants = require("../constants/SessionConstants");

var SessionActions = {
  receiveCurrentUser: function(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },

  removeCurrentUser: function(){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
