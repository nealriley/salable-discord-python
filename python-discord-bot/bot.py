import discord
from salable.license import check_grantee_id
import os

bot = discord.Bot()
connections = {}

@bot.command()
async def salable(ctx): 
    # Get relevant ids you want to check against as grantee_ids
    user_id = ctx.author.id
    guild_id = ctx.guild.id
    channel_id = ctx.channel.id

    # Get license status for each grantee_id
    user_check=check_grantee_id(user_id)
    is_user_licensed=user_check["licensed"]
                
    guild_check=check_grantee_id(guild_id)
    is_guild_licensed=guild_check["licensed"]
    
    channel_check=check_grantee_id(channel_id)
    is_channel_licensed=channel_check["licensed"]

    # A default response (both licensed and not) which shows the license status
    embed = discord.Embed()
    embed.description = f'''LICENSE STATUS.
    User: {is_user_licensed} - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={user_id})
    Channel: {is_channel_licensed} - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={channel_id})
    Guild: {is_guild_licensed} - - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={guild_id})
    '''
    await ctx.send(embed=embed)

bot.run(os.environ.get("DISCORD_BOT_TOKEN",""))