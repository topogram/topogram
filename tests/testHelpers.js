import { expect }  from 'chai'
import { slugify } from '../imports/helpers.js'

describe('The Main Helpers: ', () => {
  describe('the slugify function', () => {
    it('should return a clean slug from any string', ()=>
      expect(slugify('Marie Antoinette')).to.equal('marie-antoinette')
    )
  })
})


/*
describe("The Network Object: ", () => {
  it('should have a name', () => {
    var foo = 'bar'
    expect(foo).to.not.equal('bar')
  })
})
*/
