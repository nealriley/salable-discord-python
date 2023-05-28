import discord
from salable.license import check_grantee_id, get_license_details_from_ctx
import os

bot = discord.Bot()
connections = {}


@bot.command()
async def free(ctx):
    embed = discord.Embed()
    embed.description = f'''This endpoint is free to use, so no license check needed!'''
    await ctx.send(embed=embed)

@bot.command()
async def premium(ctx):
    # Get relevant ids you want to check against as grantee_ids
    is_user_licensed, is_channel_licensed, is_guild_licensed = get_license_details_from_ctx(ctx)
    embed = discord.Embed()
    if is_user_licensed or is_channel_licensed or is_guild_licensed:
        embed.description = f'''You are licensed to use this premium feature!'''
    else: 
        embed.description = f'''Woops, sorry you're not licensed to use this feature. Please use /salable to buy a license'''
    await ctx.send(embed=embed)

@bot.command()
async def salable(ctx): 

    user_id = ctx.author.id
    guild_id = ctx.guild.id
    channel_id = ctx.channel.id

    # Get relevant ids you want to check against as grantee_ids
    is_user_licensed, is_channel_licensed, is_guild_licensed = get_license_details_from_ctx(ctx)

    # A default response (both licensed and not) which shows the license status
    embed = discord.Embed()
    embed.description = f'''LICENSE STATUS.
    User: {is_user_licensed} - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={user_id})
    Channel: {is_channel_licensed} - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={channel_id})
    Guild: {is_guild_licensed} - - [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?grantee_id={guild_id})
    '''
    await ctx.send(embed=embed)

bot.run(os.environ.get("DISCORD_BOT_TOKEN",""))