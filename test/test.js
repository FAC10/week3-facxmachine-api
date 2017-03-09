QUnit.test('Does the buildURL function build the url?', function(assert) {
  var fakeQuery = 'janet jackson';
  var expected = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&q=janet%20jackson&type=video&key=AIzaSyC7nC_V0Udrr0v115_SYmCsPounM-_RsIg';
  assert.deepEqual(buildURL(fakeQuery), expected, 'Yes, the buildURL function builds the URL: ' + buildURL(fakeQuery));
});
