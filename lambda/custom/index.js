/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-use-before-define */


// City Guide: A sample Alexa Skill Lambda function
//  This function shows how you can manage data in objects and arrays,
//   choose a random recommendation,
//   call an external API and speak the result,
//   handle YES/NO intents with session attributes,
//   and return text data on a card.

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
/*const https = require('https');*/

const Coldsafetytips = ['`Watch for frostbite` means frostbite can happen in minutes, especially on the extremities such as fingers, toes, nose and ears but can affect any area of exposed skin. Now listen indicators of frostbite, First degree means Ice crystals are forming on your skin, Second degree means Skin begins to feel warm even though it is not yet defrosted, Third degree means Skin turns red, pale or white, Fourth degree means Pain lasts for more than a few hours and skin may develop dark blue or black. See a doctor immediately if these symptoms arise. Gangrene is a real threat. Now for further help please refer your national weather websites.',
    '`Beware of Hypothermia` means When your body temperature sinks below 96°F, you have hypothermia, a serious health hazard that occurs when body temperature is lowered to much. Get medical attention immediately. Now for further help please refer your national weather websites.',
    'after it warm up `Check Your Pipes`, `Salt Your Walkways`, `Call Your Neighbors`, `Refill Your Supplies` thats it. Now for further help please refer your national weather websites.'
];
const Heatssafetytips = ['`Do Not Burn or Tan` means Avoid intentional tanning. It may contribute to skin cancer and premature aging of skin. I recommand to you Check the UV Index Every Day.',
    ' `Seek Shade` means Get under cover when the sun’s rays are the strongest between 10 am and 4 pm. I recommand to you Check the UV Index Every Day.',
    '`Wear Protective Clothing` means Wear long-sleeved shirts and pants and a wide-brimmed hat as well as UV-blocking sunglasses. I recommand to you Check the UV Index Every Day.',
    '`Use Extra Caution Near Water and Sand` means  These surfaces reflect the damaging rays of the sun, which can increase your chance of sunburn. I recommand to you Check the UV Index Every Day.',
    '`Get Vitamin D safely` means While the skin needs sunlight to help manufacture vitamin D, which is important for normal bone health, overexposure to UV light can be detrimental by damaging and killing skin cells. I recommand to you Check the UV Index Every Day.',
    '`Protect Children from UV Rays` means Children, the elderly and those with special needs may need special attention or be more sensitive to sun. be aware of the dangers of UV exposure.  I recommand to you Check the UV Index Every Day.',
];
const floodsafetytips = ['During flood `stay informed` means Listen to radio and television, including NOAA Weather Radio if possible, check the Internet and social media for information and updates. ',
    'During flood `Get to Higher Ground` means If told to evacuate, do so immediately. Lock your home when you leave. If you have time, disconnect utilities and appliances.',
    'During flood `Practice Electrical Safety` means  Don`t go into a basement, or any room, if water covers the electrical outlets or if cords are submerged. If you see sparks or hear buzzing, crackling, snapping or popping noises--get out! Stay out of water that may have electricity in it.',
    'During flood `Avoid Flood Waters` means Don`t walk through flood waters. It only takes 6 inches of moving water to knock you off your feet.'

];

function getRandomItem(arrayofitems) {
    // can take an array, or a dictionary
    if (Array.isArray(arrayofitems)) {
        // the argument is an array []
        let i = 0;
        i = Math.floor(Math.random() * arrayofitems.length);
        return (arrayofitems[i]);
    }
}
// 1. Handlers ===================================================================================

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        const speechOutput = `${requestAttributes.t('WELCOME')} ${requestAttributes.t('HELP')}`;
        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const AboutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder
            .speak(requestAttributes.t('ABOUT'))
            .getResponse();
    },
};

const AboutColdHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutColdIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;


        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.speechOutput = `Extremely cold weather comes in winter by cold wind. People exposed to extreme cold are susceptible to frostbite in a matter of minutes. 'Hypothermia' is another threat during extreme cold. 'Hypothermia' occurs when the body loses heat faster than it can produce. Cold weather can also affects crops. A freeze occurs when the temperature drops below 32°F.  Freezes and their effects are significant during the growing season. Would you like to hear more about other weather say help?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const AboutFloodHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutFloodIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;


        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.speechOutput = ` Flooding typically occurs when prolonged rain falls over several days, when intense rain falls over a short period of time, or when an ice or debris jam causes a river or stream to overflow onto the surrounding area. Flooding can also result from the failure of a water control structure, such as a levee or dam. Would you like to hear more about other weather say help?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const AboutheatHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutheatIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();


        sessionAttributes.speechOutput = `Excessive Ultraviolet (UV) Radiation are produce extremly heat condition which increase temp of earth and comes lots of disease like skin cancer, skin problem. it is very affets our life. Would you like to hear more about other weather say help ?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const FloodSafetyIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'FloodSafetyIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.speechOutput = `'Before a flood' here some tips will help you getting out. Please listen carefully. First of all you need to creating a Communications Plan and Assemble an Emergency Kit (like food, water, medicine etc.). after it know your risk, prepare your home or pets, signup for notification, Charge Your Essential Electronics and leave. thats it. we also recommand you check your national weather websites for further help. Would you like to hear more tips say more flood safety tips?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const HeatsafetyIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'HeatsafetyIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.speechOutput = `For stay safe in the sun please Check the UV Index Every Day. i recommand you to use your national weather websites for further help. Would you like to hear more help tips say more heat tips?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const ExtremeColdSafetyIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'ExtremeColdSafetyIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.speechOutput = `For prepare for cold weather you need to keep some tips in your mind. please listen carefully. first of all Check the Forecast at weather.gov or your favorite weather app, station, etc. after it adjust your schedule, Protect Your Pets, Livestock and other Property. Fill up the tank of your vehicle. after all update your winter car survival kit like Jumper cables, Flashlights, First Aid Kit, blankets, food, water, clothes etc.  Would you like to hear more?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const MoreColdtipsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'MorecoldtipsIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const coldtips = getRandomItem(Coldsafetytips);

        sessionAttributes.speechOutput = coldtips + ` Would you like to hear more say more cold tips?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const MoreHeatSafetyTipsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'MoreheatsfetytipsIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();

        const moreheatsafetytips = getRandomItem(Heatssafetytips);
        sessionAttributes.speechOutput = moreheatsafetytips + `  Would you like to hear more say more heat safety tips?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};

const MorefloodSafetytipsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'MoreFloodtipsIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const morefloodtips = getRandomItem(floodsafetytips);
        sessionAttributes.speechOutput = morefloodtips + `  Would you like to hear more tips say more flood safety tips?`;

        return responseBuilder.speak(sessionAttributes.speechOutput).reprompt(sessionAttributes.speechOutput).getResponse();
    },
};
const YesHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('HELP'))
            .reprompt(requestAttributes.t('HELP'))
            .getResponse();

    },
};

const RepeatIntentHandlar = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        return handlerInput.responseBuilder.speak(sessionAttributes.speechOutput)
            .reprompt(sessionAttributes.repromptText)
            .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('HELP'))
            .reprompt(requestAttributes.t('HELP'))
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.NoIntent' ||
                request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('STOP'))
            .getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const FallbackHandler = {

    // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

    //              This handler will not be triggered except in that locale, so it can be

    //              safely deployed for any locale.

    canHandle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'

        &&
        request.intent.name === 'AMAZON.FallbackIntent';

    },

    handle(handlerInput) {

        return handlerInput.responseBuilder

            .speak(FALLBACK_MESSAGE)

        .reprompt(FALLBACK_REPROMPT)

        .getResponse();

    },

};


// 2. Constants ==================================================================================

const languageStrings = {
    en: {
        translation: {
            WELCOME: 'Welcome to weather disaster relief guide',
            HELP: 'Say about, to hear more about cold,  heat, flood , or , to hear safety tips , say cold safety tips, heat safety tips and flood safety tips.',
            ABOUT: 'this skill will help you to getting out from bed weather condition by some useful tips.  here i tell about weather like cold, flood or other and give tips for safely moving out from that. i mostly recommand you listen tips carefully and for further help visit your national weather websites or other sources',
            STOP: 'Okay, thanks for asking to me. i will see you next time!',
        },
    }
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
};


const SKILL_NAME = 'Weather disaster relief tips';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that.  It can help you learn about Gloucester if you say tell me about this place. What can I help you with?`;
const FALLBACK_REPROMPT = 'What can I help you with?';




const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function(...args) {
            return localizationClient.t(...args);
        };
    },
};

// 4. Export =====================================================================================

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchHandler,
        AboutHandler,
        AboutColdHandler,
        AboutFloodHandler,
        FloodSafetyIntentHandler,
        HeatsafetyIntentHandler,
        AboutheatHandler,
        RepeatIntentHandlar,
        ExtremeColdSafetyIntentHandler,
        HelpHandler,
        MorefloodSafetytipsIntentHandler,
        MoreColdtipsIntentHandler,
        MoreHeatSafetyTipsIntentHandler,
        StopHandler,
        YesHandler,
        FallbackHandler,
        SessionEndedHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();