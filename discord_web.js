const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/892511642548592680/IAXDHpl1VKtmrbeb9ZaRbram6tFYCLPqkPMZJ9GeCT7--wsJOsy_WV0HJ21rr9khZrDe");

(async () => {
    try {
        await hook.send('Restarting bot...');
        console.log('Successfully sent webhook!\n');
    }
    catch(e){
        console.log(e.message);
    };
})();