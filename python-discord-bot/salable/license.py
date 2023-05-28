import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

SALABLE_URL = 'https://api.salable.app/licenses/check/'
SALABLE_API_KEY = os.environ.get("SALABLE_API_KEY", "")
SALABLE_PRODUCT_ID = os.environ.get("SALABLE_PRODUCT_ID", "")

def check_grantee_id(grantee_id):
    headers = {
        'x-api-key': SALABLE_API_KEY
    }
    response = requests.get(url=f'{SALABLE_URL}?productUuid={SALABLE_PRODUCT_ID}&granteeIds=[{grantee_id}]', headers=headers)
    if response.status_code == 200:
        return({
            'status': response.status_code,
            'data': response.json(),
            'licensed' : True
        })
    else:      
        return {
            'status': response.status_code,
            'data': {},
            'licensed' : False
        }

def get_license_details_from_ctx(ctx):
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
    # Return license status for user, channel, and guild.
    return [is_user_licensed, is_channel_licensed, is_guild_licensed ]