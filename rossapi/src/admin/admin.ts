import { addUser as addUserToDatastore, addFeedToUser } from "../data/users/userDatastore";
import { addFeed } from "../data/rssFeeds/rssFeedDataStore";

export function addUser(name, discordId)
{
    addUserToDatastore(name, discordId)
        .then((doc) => {
            console.log("User added");
            return doc;
        });
}

export function addUserFeed(discordId, feedUrl, feedName)
{
    var feedId = addFeed(feedUrl)
        .then((feedId => {
            if (!feedId)
            {
                console.log("Not a valid RSS feed");
                return null;
            }
            addFeedToUser(discordId, feedId, feedName)
                .then((doc) => { return doc;})
        }));
}

// function initialiseReceiveFeedItems(app)
// {
//     app.post(routes.SEND_FEED_ITEMS, (req, res) => {
//         var feedId = req.body.feedId;
//         var items = req.body.items;

//         datastore.getDiscordIdsForFeed(feedId)
//             .then((discordIds) => {
//                 bot.sendItemsToUsers(discordIds, items);
//                 datastore.updateLastDataTime(discordIds, feedId)
//                     .then(() =>
//                     {
//                         res.status(200).send();
//                     });
//             })
//             .catch((err) =>
//             {
//                 console.log(err);
//                 res.status(500).send();
//             });
//     });
// }