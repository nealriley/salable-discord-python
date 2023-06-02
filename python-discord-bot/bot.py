import discord
from salable.license import check_grantee_id, get_license_details_from_ctx
import os
from discord.ext import commands

bot = discord.Bot()
connections = {}


def is_available_command(command):
    return [c.name for c in [
        "welcome", 
        "modplus"
    ]]

@commands.Cog.listener()
async def on_guild_join(self, guild):
    print(f"Joined {guild.name}")


@bot.command()
async def guildist(ctx, *args):
    user_id = ctx.author.id
    channel_id = ctx.channel.id
    bot = args[1]
    print(bot)
    embed = discord.Embed()
    embed.description = f'''Wanna try guildPlus? [Buy now]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?user_id={channel_id})'''
    await ctx.send(embed=embed)


async def handle_request(ctx):
    # Do something with the request
    embed = discord.Embed()
    embed.description = f'''Thank you for purchasing guildPlus! You can now use the following commands:
    /guildist plus bots
    /guildist plus integrations
    Thank you for support guild.ist! You can find more information at https://guild.ist/docs'''
    await ctx.send(embed=embed)

@bot.command()
async def guildplus(ctx): 

    user_id = ctx.author.id
    guild_id = ctx.guild.id
    channel_id = ctx.channel.id

    # Get relevant ids you want to check against as grantee_ids
    is_user_licensed, is_channel_licensed, is_guild_licensed = get_license_details_from_ctx(ctx)

    if is_channel_licensed: 
        await handle_request(ctx)
    else:
        embed = discord.Embed()
        embed.description = f'''
        You will need to purchase a license to use this command.
        [purchase link]({os.environ.get("NEXT_FRONTEND_URL", "")}/purchase?user_id={channel_id})
        '''
        await ctx.send(embed=embed)

bot.run(os.environ.get("DISCORD_BOT_TOKEN",""))