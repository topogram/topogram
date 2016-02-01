var baseURL = "http://localhost:5000";

var TopogramAPI = function(baseURL, email, password) {
  console.log("init API at ", baseURL, " for user ", email);
  console.log(this);
  var self = this
  this.baseURL = baseURL;
  this.email = email;
  this.password = password;
}
TopogramAPI.baseURL = baseURL;

TopogramAPI.prototype.login = function () {
  var self = this;
  var auth_url=self.baseURL+"/api/v1/sessions";

  var result = Meteor.http.call("POST", auth_url, {
    data: {
      'email': 'clement.renaud@gmail.com',
      'password': 'password',
    },
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    },
  });

  self.cookie_value = result['headers']['set-cookie'];

  for(var c in cookie_value) {
     if(cookie_value[c].indexOf("Expires") !== -1) {
           cookie_value[c] = "";
     }
  }
}

TopogramAPI.prototype.get = function (url, options) {
  var self = this;
  console.log(self);
  if(self.cookie_value) { // logged in
    var datasets_url=url;
    result = Meteor.http.call("GET", datasets_url, {
      params: {
            timeout: 30000
      },
      headers: {
            "cookie": cookie_value,
            "content-type": "application/json",
            "Accept": "application/json"
      },
    });
    var issue = JSON.parse(result.content);
  } else {
    // log in
    self.login()
  }
};

TopogramAPI.prototype.getDatasets = function (url, options) {
  
}

topogramApi = TopogramAPI(baseURL, "clement.renaud@gmail.com", "password")
