# salable-discord-python

discord.opus.load_opus('lib/libopus.so')

# @bot.command()
# async def record(ctx):  # If you're using commands.Bot, this will also work.
#     voice = ctx.author.voice
#     user_id = ctx.author.id
#     guild = ctx.guild.id
#     print(f'Guild: {guild} --- User: {user_id}')
#     if not voice:
#         await ctx.respond("You aren't in a voice channel!")
#     vc = await voice.channel.connect()  # Connect to the voice channel the author is in.
#     connections.update({ctx.guild.id: vc})  # Updating the cache with the guild and channel.

#     vc.start_recording(
#         discord.sinks.WaveSink(),  # The sink type to use.
#         once_done,  # What to do once done.
#         ctx.channel  # The channel to disconnect from.
#     )
#     await ctx.respond("Started recording!")

# async def once_done(sink: discord.sinks, channel: discord.TextChannel, *args):  # Our voice client already passes these in.
#     recorded_users = [  # A list of recorded users
#         f"<@{user_id}>"
#         for user_id, audio in sink.audio_data.items()
#     ]
#     await sink.vc.disconnect()  # Disconnect from the voice channel.
#     files = [discord.File(audio.file, f"{user_id}.{sink.encoding}") for user_id, audio in sink.audio_data.items()]  # List down the files.
#     await channel.send(f"finished recording audio for: {', '.join(recorded_users)}.", files=files)  # Send a message with the accumulated files.

# @bot.command()
# async def stop_recording(ctx):
#     if ctx.guild.id in connections:  # Check if the guild is in the cache.
#         vc = connections[ctx.guild.id]
#         vc.stop_recording()  # Stop recording, and call the callback (once_done).
#         del connections[ctx.guild.id]  # Remove the guild from the cache.
#         await ctx.delete()  # And delete.
#     else:
#         await ctx.respond("I am currently not recording here.")  # Respond with this if we aren't recording.
