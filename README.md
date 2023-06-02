# guild.ist - The Discord Bot Marketplace
## A SaaS platform built on Salable, Discord, Clerk, NextJS, pycord, and fly,io


## About this project

guild.ist was born out of a need to demosntrate the ease by which you could start a 'more than just a website' SaaS business. This example utilizes fly.io as the execution environment, NextJS w/ Clerk for Auth, and Python (w/ pycord) for the Discord app integration.

Utilizing Salable and Clerk.dev together, you can build a seamless experience across web and app!

# Getting started

You'll need to get a few accounts sorted: 
- Discord 
    - [Create a guild to link your bot to](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server-)
    - [Create a Developer Account](https://discord.com/login?redirect_to=%2Fdevelopers)
- Salable
    - Create your Org
- Clerk.dev
    - Sign up
- Fly.io (for running in production)
    - Sign up
- OpenAI 
    - Sign Up



## Set up Discord

Create a new app
Get your keys
Add them to the .env file in python-discord-bot

## Set up Salable

Create a new Product
We're going to use the Freemium model with multiple subscriptions. 

- Create Free tier
- Create gulid+ tier

Get your API key, as well as your product keys

## Set up Clerk

- Get your app id and secret

## Start your frontend

With all the stuff you collected, update nextjs-frontend/.env with the following: 

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

SALABLE_API_KEY

SALABLE_PRODUCT_ID

Then, in the nextjs-frontend folder, run: 

`yarn && yarn run dev`

Get the resulting URL (Github Codespaces or ngrok)

## Start your bot

Update the following environment variables in python-discord-bot: 

SALABLE_API_KEY

NEXT_FRONTEND_URL=(The resulting url from the frontend step)

DISCORD_BOT_TOKEN

and run

`pip install -r requirements.txt && python bot.py`

# Using the app

Navigate to the nextjs resulting url and you're good to go! This allows you to purchase premium plans, via the Discord bot directly for now. (TODO: Fix that)

Deploying to fly

curl -L https://fly.io/install.sh | sh

export FLYCTL_INSTALL="$HOME/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

fly auth login

fly launch (1st time) or fly deploy (thereafter).