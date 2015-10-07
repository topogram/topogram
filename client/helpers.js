Template.registerHelper("objectToPairs",function(object){
  return _.map(object, function(value, key) {
    return {
      key: key,
      value: value
    };
  });
});
