import { rssFeedModel } from "./rssFeedModel";

export function addFeed(url)
{
    return rssFeedModel.findOneAndUpdate(
        {"url":url},
        {$set: {
            "lastPollTime": new Date(),
            "pollFrequencyMS": 300000 //Five minutes        
        }
        },
        { new: true, upsert: true})
        .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000)
            {
                console.log("We've already got that feed!!");
            }
        });
}

export function getPollableFeeds()
{
    return rssFeedModel.find()
        .where('this.lastPollTime < shiftedDate(this.pollFrequencyMS)');
}

export function shiftedDate(msShift)
{
    var date = new Date();
    date.setMilliseconds(date.getMilliseconds() + msShift);
    return date;
}

export function updateFeed(feed)
{
    rssFeedModel.findByIdAndUpdate(feed._id, {
        lastPollTime: feed.lastPollTime,
        items: feed.items
    }).catch((err) => {console.log(err);});
    console.log("Just updated " + feed.url);
}