var gulp               = require('gulp');
var SauceLabsConnector = require('saucelabs-connector');

var browser = {
    browserName: 'chrome',
    platform:    'Windows 10',
    version:     'beta'
};


gulp.task('test-local', function () {
    return gulp
        .src('test/**/*-test.js')
        .pipe(qunitHarness(CLIENT_TESTS_SETTINGS));
});

gulp.task('test-remote', function () {
    return new Promise(res => {
        setTimeout(res, 20 * 60 * 1000);

        var createTestCafe = require('testcafe');
        var runner         = null;
        var rc             = null;
        var os             = require('os');

        console.log(os.hostname());


        createTestCafe(os.hostname(), 1337, 1338)
            .then(tc => {
                runner = tc.createRunner();

                return tc.createBrowserConnection();
            })
            .then(remoteConnection => {
                console.log(remoteConnection.url);

                rc = remoteConnection;

                var slConnector = new SauceLabsConnector('JohnSilverM', '5ac1ea58-8ea0-4f15-a0c9-1e41786bcc51');

                return slConnector
                    .connect()
                    .then(function () {
                        return slConnector.startBrowser(browser, 'example.com');
                    })
            })
            .then(() => {
                return runner
                    .src('./test.js')
                    .browsers([rc])
                    .reporter('spec')
                    .run();
            })
            .then(failedCount => {
                console.log('failedCount', failedCount);
            })
            .catch(error => {
                console.log('error', error);
            });
    });
});

gulp.task('travis', [process.env.GULP_TASK || '']);