QUnit.test('Does the buildURL function build the url?', function(assert) {
  var fakeQuery = 'the matrix';
  var expected = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=the%20matrix&api-key=53071d639fc94012b9700d4e3a0f5e44';
  assert.deepEqual(buildURL(fakeQuery), expected, 'Yes, the buildURL function builds the URL: ' + buildURL(fakeQuery));
});
