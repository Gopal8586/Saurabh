
let currentLanguage = 'en';

const responses = {
    en: {
        "hello": "Hello! My name is Gopal, How can I assist you today?",
        "how are you": "I'm just a bot, but I'm here to help you!",
        "menu": "You can check our menu on our website.",
        "time": "We are open from 10 AM to 10 PM.",
        "location": "We are located at 123 Veg Street, Green City.",
        "what is your refund policy": "You can request a refund within 7 days of your purchase. Here is the link to our refund policy page: [Refund Policy Page Link]",
        "how i can place order": "You can place your order through our website or food delivery apps.",
        "feedback": "We love your feedback! You can share it on our website or social media.",
        "what is in food": "We offer vegetarian food and beverages in Our Restaurant",
        "order": "You can Order too many variety of food from our Restaurant Website.",
        "food": "We offer vegetarian food and beverages in Our Restaurant",
        // "khana": "Hamare paas bahut saare swadisht khane hain! Aap menu page par dekh sakte hain.",
    },
    hi: {
        "नमस्ते": "नमस्ते! मेरा नाम गोपाल है, मैं आज आपकी कैसे सहायता कर सकती हूँ?",
        "आप कैसे हैं": "मैं तो एक बोट हूँ, लेकिन मैं आपकी मदद के लिए यहाँ हूँ!",
        "मेन्यू": "आप हमारे मेन्यू को हमारी वेबसाइट पर देख सकते हैं।",
        "समय": "हम सुबह 10 बजे से रात 10 बजे तक खुले हैं।",
        "भोजन": "हमारे यहां शाकाहारी भोजन और पेय पदार्थ मिलते हैं",
        "स्थान": "हम 123 वेज स्ट्रीट, ग्रीन सिटी में हैं।",
        "रिफंड": "आप अपनी खरीद के 7 दिन के अंदर रिफंड के लिए अनुरोध कर सकते हैं। यहाँ हमारी रिफंड नीति पृष्ठ का लिंक है: [Refund Policy Page Link]",
        "आर्डर": "आप अपनी ऑर्डर हमारी वेबसाइट या फ़ूड डिलीवरी ऐप्स के जरिए कर सकते हैं।",
        "फीडबैक": "हमें आपका फीडबैक बहुत पसंद है! आप इसे हमारी वेबसाइट या सोशल मीडिया पर दे सकते हैं।",
    },
    es: {
        "hola": "¡Hola! Mi nombre es Gopal. ¿En qué puedo ayudarle hoy?",
        "cómo estás": "¡Soy solo un bot, pero estoy aquí para ayudarte!",
        "menú": "Puedes ver nuestro menú en nuestro sitio web.",
        "hora": "Estamos abiertos de 10 AM a 10 PM.",
        "ubicación": "Estamos ubicados en 123 Veg Street, Ciudad Verde.",
        "reembolso": "Puedes solicitar un reembolso dentro de los 7 días posteriores a tu compra. Aquí está el enlace a nuestra página de política de reembolso: [Refund Policy Page Link]",
        "pedido": "Puedes hacer tu pedido a través de nuestro sitio web o aplicaciones de entrega de comida.",
        "retroalimentación": "¡Nos encanta tu retroalimentación! Puedes compartirla en nuestro sitio web o en las redes sociales.",
    }
};

const hinglishResponses = {
    "kya hai khana": "Hamare paas kai swadisht shakahari vyajan hain! Aap menu page par check kar sakte hain.",
    "kya hai menu": "Hamare menu mein kai tarah ke tasty shakahari options hain. Kripya menu page dekhein.",
    "kya hai refund policy": "Aap apne purchase ke 7 din ke andar refund ke liye request kar sakte hain. Kripya apna order number dein.",
    "aap kaise hain": "Main to ek bot hoon, lekin aap kaise hain? Kaise madad kar sakta hoon?",
    "aapka naam kya hai": "Mera naam Gopal hai, aapki madad ke liye yahaan hoon!",
    "reservation": "Aap humein 123-456-7890 par call karke ya website se reservation kar sakte hain.",
    "kya hai delivery options": "Hum delivery services bhi dete hain! Aap hamari website ya food delivery apps ke madhyam se order kar sakte hain.",
    "kya hai samay": "Hamare khane ka samay subah 10 baje se raat 10 baje tak hai.",
    "feedback": "Humein aapka feedback bahut pasand hai! Aap ise hamari website ya social media par de sakte hain.",
    "kya hai special": "Hamare paas rozana special hote hain, jo aap menu page par dekh sakte hain!",
    "kya hai bhuktan ke vikalp": "Hum nakad, card, aur UPI bhuktan accept karte hain.",
    "kya hai aapka pata": "Hum 123 Veg Street, Green City par hain.",
    "kya aap catering dete hain": "Haan, hum catering services bhi dete hain! Kripya adhik jankari ke liye humein sampark karein.",
    "kya hai order": "Aap apna order website par ya food delivery apps ke through kar sakte hain.",
    "khana": "Hamare paas bahut saare swadisht khane hain! Aap menu page par dekh sakte hain.",
    "time": "Hamare khane ka samay subah 10 baje se raat 10 baje tak hai.",
    "place": "Hum 123 Veg Street, Green City par hain.",
    "feedback": "Humein aapka feedback pasand hai! Aap ise hamari website ya social media par de sakte hain.",
    "khane me kya h": "Hamare paas bahut saare swadisht khane hain! Aap menu page par dekh sakte hain.",
    
    
};

const misspellings = {
    en: {
        "refund": ["refun","refund", "refunf", "reimbursemnt", "rebund","what is your refund policy"],
        "samay": ["samy", "samae", "sama", "samaaye"],
        "location": ["lokeshan", "locashan", "lokeshan","kaha"],
        "food": ["foood", "fud", "fooodd", "foood","khana","khana"],
        "hello": ["helo", "hi", "helllo","hii","hey", "Hello", "namaste"],
        "how are you": ["how r u", "hw are u", "how are ya", "howru", "kaise ho"],
        "order":["Order","ordr","ordeer", "how i can place order"],
        "thank you": ["thanq", "thnx", "thanx", "thanqs","thanks"],
        "menu": ["manu", "menue", "menuu", "men"],
        
    },
    hi: {
        "रिफंड": ["रिफंड", "रिफंड्", "रिफण्ड", "रिफंडिंग", "Refund", "refund"],
        "समय": ["स्मय", "समय", "समय", "समा","time"],
        "स्थान": ["स्थान", "लोकशन", "कहाँ", "ठिकाना"],
        "भोजन": ["भोजन", "फूड", "भोजन्", "फुड़","khana","khana kya hai","food", "khana","खान", "कान", "खांन", "खाना"],
        "नमस्ते": ["नमस्ते", "नमस्ते!", "नमस्ते, ", "नमस्ते! ", "hello", "Hello","helo", "hi", "helllo","hii","hey", "Hello", "namaste"],
        "आप कैसे हैं": ["आप कैसे हैं", "आप कसे हो", "आप कैसे", "कैसे हो"],
        "धन्यवाद": ["धन्यवाद", "धन्यबाद", "धन्वाद", "धन्यबाद"],
        "मेन्यू": ["मेन्यू", "मेनु", "मेन्यू ", "मेण्यू", "menu"],
    },
    es: {
        "reembolso": ["reemboso", "rembolso", "rembolsso"],
        "comida": ["comida", "fud", "cena"],
        "hora": ["hora", "horra","time"],
        "ubicación": ["ubicacion", "ubicacio"],
        "hola": ["ola", "holaa", "holla","hello", "Hello"],
        "gracias": ["gracias", "graciias"],
        "menú": ["menú", "menuu","menu"], 
    }
};

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const chatIconText = document.getElementById('chat-icon-text');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
    chatIconText.innerText = chatContainer.style.display === 'block' ? '❌' : '🤖'; 
}

function toggleLanguageSelector() {
    const languageSelector = document.getElementById('language-selector');
    languageSelector.style.display = languageSelector.style.display === 'none' ? 'block' : 'none';
}


function changeLanguage() {
    const selectedLang = document.getElementById('language-selector').value;
    currentLanguage = selectedLang;
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div class="bot-message">Language changed to ${selectedLang === 'hi' ? 'हिन्दी' : selectedLang === 'es' ? 'Español' : 'English'}.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

    // Close language selector after selection
    document.getElementById('language-selector').style.display = 'none';
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        respond(userMessage);
        userInput.value = ''; 
    }
}

function respond(message) {
    const chatBox = document.getElementById('chat-box');
    let response = "";

    // Check for misspellings
    const misspelled = Object.keys(misspellings[currentLanguage]).find(key => {
        return misspellings[currentLanguage][key].includes(message.toLowerCase());
    });

    if (misspelled) {
        response = responses[currentLanguage][misspelled];
    } else {
        if (currentLanguage === 'hi' || currentLanguage === 'es') {
            message = message.toLowerCase();
        }

        response = responses[currentLanguage][message] || hinglishResponses[message] || "Sorry, I don't understand.";
    }



    if (response.includes("[Refund Policy Page Link]")) {
        response = response.replace(
            "[Refund Policy Page Link]",
            `<a href="html/Refund.html" target="_blank" style="color: blue; text-decoration: underline;">Refund Policy Page</a>`
        );
    }

    displayMessage(response, 'bot');
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    if (sender === 'bot') {
        messageDiv.innerHTML = message; 
    } else {
        messageDiv.innerText = message; 
    }
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}


