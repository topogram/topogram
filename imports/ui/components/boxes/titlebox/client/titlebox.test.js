import { Template } from 'meteor/templating'
import { chai } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';

var expect = chai.expect
console.log(expect);

import { withRenderedTemplate } from '../../../../test-helpers.js';
import '../titlebox.js';

describe('Titlebox', function () {

  console.log("heeh");

  beforeEach(function () {
    Template.registerHelper('_', key => key);
  });

  afterEach(function () {
    Template.deregisterHelper('_');
  });

  it('displays a h1 title with the name of the topogram', function () {

    const data = {
      network : {},
      advancedEditMode : false,
      topogramName : "myNetwork",
      onEditingChange: () => 0
    }
    withRenderedTemplate('titlebox', data, el => {
      expect( $(el).find('#titlebox').val() ).to.not.be.undefined
      expect( $(el).find('h1').val() ).to.not.be.undefined
      // expect( $(el).find('h1').html() ).to.be.equal("myNetwork")
    });
  });
});
