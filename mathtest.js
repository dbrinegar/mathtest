/*
  MathTest:
  .check() to validate an answer and move to next test if good
  .onUpdate() to set a callback for display of results and such
*/

var MathTest = function() {
  var updater, tests, curTest, failed, passed, encouragements;

  // return list of math pairs, 1-12 each
  function scrambledPairs() {
    var r = [], a, b;
    for (a = 1; a <= 12; a += 1) {
      for (b = 1; b <= 12; b += 1) {
        r.push([a, b]);
      }
    }
    return _.shuffle(r);
  }

  function newtest() {
    tests = scrambledPairs();
    curTest = 0;
    encouragements = parseInt(Math.random() * 4) + 4;
  }

  function update(fail, msg) {
    updater(tests[curTest][0],
            tests[curTest][1],
            fail,
            msg);
  }

  failed = passed = 0;
  newtest();

  return {
    onUpdate: function(cb) {
      updater = cb;
      update();
    },
    check: function(a, b, r) {
      var fail, msg;
      if (-1 === r.search('[0-9]+')) {
        // no answer to check
        return;
      }
      if (a * b == r) {
        passed++;
        curTest++;
        if (curTest === tests.length) {
          // completed another full set of tests
          var i = completed = passed / tests.length;
          msg = '';
          for (; i > 0; i--) {
            msg += '* ';
          }
          msg += 'passed ' + completed + ' complete test';
          msg += (completed > 1 ? 's' : '');
          newtest();
        }
        // give some encouragements for each test
        if (0 === curTest % parseInt(tests.length / encouragements))
        {
          var percentComplete = parseInt(100 * curTest / tests.length);
          msg = 'great work! ' + percentComplete + '% done';
        }
        update();
      } else {
        console.log('failed ' + tests[curTest]);
        failed++;
        fail = true;
      }
      update(fail, msg);
    }
  };
}();

