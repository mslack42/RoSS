import Parser from "rss-parser";
import { getPollableFeeds, updateFeed, addFeed as addFeedToDatastore } from "../data/rssFeeds/rssFeedDataStore";

const feedParser = new Parser();

export function initialise(frequencyMS) {
    setInterval(pollFeeds, frequencyMS)
    console.log("Feeder initialised");
}

function pollFeeds(){
    console.log("Polling feeds");
    getPollableFeeds()
        .exec()
        .then(feeds => {
            feeds.forEach(pollFeed)
        });
}

function pollFeed(feed)
{
    let polltime = new Date();
    let updatesFound = false;
    feedParser.parseURL(feed.url).then((rss) => {
        rss.items.forEach(item => {
            if (Date.parse(item.pubDate) > feed.lastPollTime)
            {
                updatesFound = true;
                feed.items.push(
                    {
                        title: item.title,
                        description: item.contentSnippet,
                        link: item.link,
                        pubDate: Date.parse(item.pubDate)
                    }
                );
            }
        });
        let oldItemsCutoff = feed.lastPollTime;
        feed.lastPollTime = polltime;
        updateFeed(feed);
        if (updatesFound)
        {
            // admin.sendFeedUpdated(feed, oldItemsCutoff);
        }
    });
}

async function testFeed(feedUrl)
{
    try {
        return feedParser.parseURL(feedUrl)
            .then(() => {return true;})
            .catch((err) => { return false;})
    } catch (err) {
        return false;
    }
}

export async function addFeed(feedUrl)
{
    var validFeed = await testFeed(feedUrl);
    if (!validFeed)
    {
        return null;
    }

    return addFeedToDatastore(feedUrl)
        .then( (doc) => { return doc;});
}