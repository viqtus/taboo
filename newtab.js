var chrome = chrome;

var window = window;

var taboo =
{
	history:
	{
		sort: function(query, pages)
		{
			chrome.history.search
			(
				query,
				function(object)
				{
					/* Sort Elements */
					for(var i = 0; i < object.length - 1; i++)
					{
						for(var j = 0; j < object.length - i - 1; j++)
						{
							if(object[j].visitCount > object[j+1].visitCount)
							{
								var swap = object[j];
								object[j] = object[j+1];
								object[j+1] = swap;
							};
						};
					};

					var results = [];

					/* Append Pages */
					for(var i = object.length - 1; i > object.length - pages - 1; i--)
					{
						var page = document.createElement('div');
							page.className = 'page';
							page.title = object[i].url;
							page.innerHTML = '<img src="chrome://favicon/' + object[i].url + '"></img>' + object[i].title;

						page.onclick = function()
						{
							window.location = this.title;
						};

						CONTENT.appendChild(page);
					};
				}
			);
		}
	},

	time:
	{
		full: function(time)
		{
			var time = time.toString().length > 1 ? time : '0' + time;
			return time;
		},

		show: function()
		{
			var date = new Date();
			var hours = taboo.time.full(date.getHours());
			var minutes = taboo.time.full(date.getMinutes());

			window.document.title = [hours, minutes].join(':');
		}
	},

	visits: [],

	visit:
	{
		current: 0,
		max: 0,
		title: '',
		url: ''
	}
};

window.onload = function()
{
	taboo.time.show();
	taboo.history.sort
	(
		{
			maxResults: 128,
			text:''
		},
		12
	);

};

window.setInterval(function(){taboo.time.show()}, 1000);