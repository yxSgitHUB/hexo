var prompt = require("prompt");
//
// Start the prompt
//
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(["postName"], function (err, result) {
  //
  // Log the results.
  //

  var exec = require("child_process").exec;

  exec("hexo new post " + result.postName, function (error, stdout, stderr) {
    // 获取命令执行的输出
  });
});
