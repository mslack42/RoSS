import { userModel } from "./userModel";

export function addUser(name, discordId)
{
    return userModel.findOneAndUpdate(
        { discordId: discordId},
        { name: name},
        { new: true, upsert: true }
    );
}

export function addFeedToUser(discordId, feedId, feedName)
{
    return userModel.findOneAndUpdate(
        {discordId: discordId, 'feeds.feedId': {$ne: feedId}},
        {$push: {feeds: {
            name: feedId,
            feedId: feedId,
            lastDataTime: new Date()
            }
        }},
        {
            new: true
        },
        (err) => {
            if (err)
            {
                console.log(err);
            }
        }
    );
}

export function updateLastDataTime(discordIds, feedId)
{
    return userModel.updateMany(
        {discordId: {$in: discordIds}, 'feeds.feedId': {$eq: feedId}},
        {$set: {'feeds.$.lastDataTime': new Date()}}
    );
}