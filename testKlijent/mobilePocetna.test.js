forAll([
    ["mobile", "400x700"],
    ["tablet", "600x800"],
    ["desktop", "1024x768"]
  ], function (deviceName, size){
      test("Home page test on mobile device", function () {
        var driver = createDriver("http://galenframework.com",
                            "640x480");
    });
});