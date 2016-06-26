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

  it('renders correctly with simple data', function () {

    const data = {
      network : {},
      advancedEditMode : false,
      onEditingChange: () => 0
    }
    withRenderedTemplate('titlebox', data, el => {
      console.log($(el));
      expect( $(el).find('#titlebox').val() ).to.not.be.undefined
      expect( $(el).find('h1').val() ).to.not.be.undefined
    });
  });
});
