  function failTest(name){
    test(name, function() {
      equal(true, false);
    });
  }

  function successTest(name) {
    test(name, function() {
      equal(true, true);
    });
  }

  successTest('Should success1');
  successTest('Should success2');
  successTest('Should success3');
  /*failTest('Shoud fail 1');
  failTest('Shoud fail 2');
  failTest('Shoud fail 3');
*/
  var log = [];
  var testName;
  QUnit.done = function (test_results) {
    var tests = log.map(function(details){
      return {
        name: details.name,
        result: details.result,
        expected: details.expected,
        actual: details.actual,
        source: details.source
      }
    });
    test_results.tests = tests;

    // delaying results a bit cause in real-world
    // scenario you won't get them immediately
    setTimeout(function () { window.global_test_results = test_results; }, 2000);
  };
  QUnit.testStart(function(testDetails){
    QUnit.log = function(details){
      if (!details.result) {
        details.name = testDetails.name;
        log.push(details);
      }
    }
  });

QUnit.test( "Async test", function( assert ) {
  var done = assert.async();
  setTimeout(function() {
    assert.equal(true, true);
    done();
  }, 60000*9);
});