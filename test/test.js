QUnit.test('Does the buildURL function build the url?', function(assert) {
  var fakeQuery = 'the matrix';
  var expected = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=the%20matrix&api-key=53071d639fc94012b9700d4e3a0f5e44';
  assert.deepEqual(buildURL(fakeQuery), expected, 'Yes, the buildURL function builds the URL: ' + buildURL(fakeQuery));
});

QUnit.test('Does createOurElement function create the right elements?', function(assert) {
  var fakeQuery = 'div';
  var expected = document.createElement(fakeQuery);
  expected.id = 'testDiv';
  var result = createOurElement('div','testDiv')
  assert.deepEqual(result, expected, 'Yes, the function works added result: ' + result  + 'expected: ' + expected);
  assert.deepEqual(result.id, expected.id, 'Yes, the function assigns the right id: ' + expected.id);
});

// QUnit.test('Does createOurElement function create the right elements?', function(assert) {
//   var fakeQuery = 'iframe';
//   var expected = document.createElement(fakeQuery);
//   expected.id = 'movie';
//   var result = createOurElement('iframe','movie');
//   assert.deepEqual(result, expected, 'Yes, the function works: ' + expected.id);
//   assert.deepEqual(result.id, expected.id, 'Yes, the function assigns the right: ' + expected.id);
// });
