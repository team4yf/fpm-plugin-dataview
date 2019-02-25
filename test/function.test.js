const { init, Func } = require("fpmc-jssdk");
const assert = require('assert');
init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api' });

describe('Function', function(){
  beforeEach(done => {
    done()
  })


  afterEach(done => {
    done()
  })

  it('Function Create', function(done){
    var func = new Func('dataview.create');
    func.invoke({ name: 'foo', title: 'foo title', origin_sql: 'select * from dvc_device', args: {}  })
      .then(function(data){
        assert.strictEqual(data == undefined, false, 'should not be undefined');
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('Function A', function(done){
    var func = new Func('dataview.run');
    func.invoke({ dv_name: 'foo', args: {name: '测试'}  })
      .then(function(data){
        assert.strictEqual(data == undefined, false, 'should not be undefined');
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      })
  })

  it('Function B', function(done){
    var func = new Func('dataview.run');
    func.invoke({ dv_name: 'foo', record: true, args: {name: '测试'} })
      .then(function(data){
        assert.strictEqual(data == undefined, false, 'should not be undefined');
        console.log(data);
        done();
      }).catch(function(err){
        done(err);
      })
  })
})
