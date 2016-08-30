var request = require('request');


exports.get = function (req, res) {

	var repoUrl = req.query.repoUrl,
		temp = repoUrl.split("github.com/");

	temp = temp[1].split("/");


	var repoOwner = temp[0],
		repoName = temp[1],
		link = "https://api.github.com/repos/" + repoOwner +"/" + repoName +"/issues?per_page=100",
		yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
		weekAgo = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)),
		openedAfter7DaysAgo = 0,
		openedBefore7DaysAgo = 0,
		openedInLast24Hrs = 0,
		total = 0;
	getIssues(link, handleIssuesData);
	function handleIssuesData(err, apiRes, body) {

	  total += body.length;
  
    //console.log("body is ", body);

		var linkHeader = apiRes.headers['link'],
			links = linkHeader && linkHeader.split(",") || [],
			nextLinkUrl = "";

		

		links.forEach(function(linkData) {
			var parts = linkData.split(";");

			if (parts[1].indexOf("rel=\"next\"") > -1) {
				nextLinkUrl = parts[0].replace(/[<>]/g, '');
				setTimeout(getIssues(nextLinkUrl, handleIssuesData), 0);
			}
		});

		

		body.forEach(function(issue) {
			var issueCreateTime = new Date(issue.created_at);
			// console.log("issueCreateTime is ", issueCreateTime)
			if (issueCreateTime.getTime() >= yesterday) {
				openedInLast24Hrs++;
			} else if (issueCreateTime.getTime() >= weekAgo) {
					openedAfter7DaysAgo++;
			} else {
				openedBefore7DaysAgo++;
			}
		});
		if (!nextLinkUrl) {
			res.send({
				total: total,
				openedInLast24Hrs: openedInLast24Hrs,
				openedAfter7DaysAgo: openedAfter7DaysAgo,
				openedBefore7DaysAgo: openedBefore7DaysAgo
			});
		}
	}
}

function getIssues(link, callback) {
	request({
		url: link,
    headers: {"User-Agent": "sample-app"},
		json: true
	}, callback);
}


