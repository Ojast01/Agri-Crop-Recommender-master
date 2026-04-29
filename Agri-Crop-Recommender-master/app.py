import streamlit as st
import pickle
import numpy as np
import time

# Page configuration
st.set_page_config(
    page_title="AgriVision AI - Smart Crop Recommender",
    page_icon="🌱",
    layout="centered"
)

# Custom CSS for Background Image & Glassmorphism UI
st.markdown("""
<style>
    /* Background Image */
    .stApp {
        background-image: url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
    }
    
    /* Make the main content area look like frosted glass */
    .block-container {
        background: rgba(0, 0, 0, 0.65); /* Dark overlay to make text readable */
        padding: 3rem !important;
        border-radius: 20px;
        backdrop-filter: blur(8px);
        margin-top: 50px;
        margin-bottom: 50px;
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
    }

    h1 {
        text-align: center;
        color: #43e97b;
        font-weight: 900;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        font-size: 3.5rem;
    }
    
    p, label, .stMarkdown {
        color: #f1f2f6 !important;
        font-size: 1.1rem;
    }

    /* Input boxes styling */
    .stNumberInput > div > div > input {
        background-color: rgba(255, 255, 255, 0.15) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 10px;
        font-weight: bold;
    }

    /* Selectbox styling */
    .stSelectbox > div > div {
        background-color: rgba(255, 255, 255, 0.15) !important;
        color: white !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        border-radius: 10px;
    }

    /* Result Box Styling */
    .result-box {
        background: linear-gradient(135deg, rgba(67, 233, 123, 0.2), rgba(56, 249, 215, 0.2));
        backdrop-filter: blur(15px);
        padding: 30px;
        border-radius: 20px;
        border: 2px solid #43e97b;
        text-align: center;
        margin-top: 30px;
        box-shadow: 0 0 20px rgba(67, 233, 123, 0.4);
        animation: fadeIn 1s ease-in-out;
    }
    
    .crop-name {
        font-size: 50px;
        color: #38f9d7;
        font-weight: 900;
        text-transform: capitalize;
        text-shadow: 0px 0px 10px rgba(56, 249, 215, 0.5);
        margin: 10px 0;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
""", unsafe_allow_html=True)

# Multilingual Translation Dictionary
TRANSLATIONS = {
    "English": {
        "title": "🌾 AgriVision AI",
        "subtitle": "Intelligent Crop Recommendation Engine",
        "info": "💡 **How to get your data:** Don't have a Smart IoT Soil Sensor? No problem! You can find your exact Nitrogen (N), Phosphorous (P), Potassium (K), and pH values printed on your Government-issued **Soil Health Card**. Just type those numbers below!",
        "desc": "Enter your soil and weather parameters. Our Machine Learning model will analyze the data and recommend the absolute best crop to grow for maximum profit.",
        "params": "### 📊 Soil & Weather Parameters",
        "n": "Nitrogen (N) Content",
        "p": "Phosphorous (P) Content",
        "k": "Potassium (K) Content",
        "temp": "Average Temperature (°C)",
        "hum": "Average Humidity (%)",
        "ph": "Soil pH Value",
        "rain": "Average Rainfall (mm)",
        "btn": "🚀 Predict Best Crop using AI",
        "loading": "Analyzing millions of data points... Processing soil profile...",
        "result_title": "The highly recommended crop for your farm is:",
        "result_msg": "Planting this crop with your current soil profile will maximize your harvest yield and financial growth!",
        "water": "💧 <strong>Water Requirement:</strong>",
        "pest": "🛡️ <strong>Recommended Pesticides:</strong>",
        "tip": "💡 <strong>Pro Tip:</strong>"
    },
    "Hindi (हिंदी)": {
        "title": "🌾 एग्रीविजन एआई",
        "subtitle": "बुद्धिमान फसल अनुशंसा इंजन",
        "info": "💡 **अपना डेटा कैसे प्राप्त करें:** क्या आपके पास स्मार्ट IoT मिट्टी सेंसर नहीं है? कोई बात नहीं! आप अपने सरकार द्वारा जारी **मृदा स्वास्थ्य कार्ड (Soil Health Card)** पर मुद्रित सटीक नाइट्रोजन (N), फॉस्फोरस (P), पोटेशियम (K), और pH मान पा सकते हैं। बस नीचे वे नंबर टाइप करें!",
        "desc": "अपनी मिट्टी और मौसम के पैरामीटर दर्ज करें। हमारा मशीन लर्निंग मॉडल डेटा का विश्लेषण करेगा और अधिकतम लाभ के लिए उगाने के लिए सबसे अच्छी फसल की सिफारिश करेगा।",
        "params": "### 📊 मिट्टी और मौसम के पैरामीटर",
        "n": "नाइट्रोजन (N) की मात्रा",
        "p": "फॉस्फोरस (P) की मात्रा",
        "k": "पोटेशियम (K) की मात्रा",
        "temp": "औसत तापमान (°C)",
        "hum": "औसत आर्द्रता (%)",
        "ph": "मिट्टी का pH मान",
        "rain": "औसत वर्षा (mm)",
        "btn": "🚀 AI का उपयोग करके सर्वश्रेष्ठ फसल खोजें",
        "loading": "लाखों डेटा बिंदुओं का विश्लेषण कर रहा है... मिट्टी प्रोफ़ाइल की जांच हो रही है...",
        "result_title": "आपके खेत के लिए अत्यधिक अनुशंसित फसल है:",
        "result_msg": "अपनी वर्तमान मिट्टी के साथ इस फसल को लगाने से आपकी उपज और वित्तीय वृद्धि अधिकतम होगी!",
        "water": "💧 <strong>पानी की आवश्यकता:</strong>",
        "pest": "🛡️ <strong>अनुशंसित कीटनाशक:</strong>",
        "tip": "💡 <strong>प्रो टिप:</strong>"
    },
    "Punjabi (ਪੰਜਾਬੀ)": {
        "title": "🌾 ਐਗਰੀਵਿਜ਼ਨ ਏਆਈ",
        "subtitle": "ਸਮਾਰਟ ਫਸਲ ਸਿਫਾਰਸ਼ ਇੰਜਣ",
        "info": "💡 **ਆਪਣਾ ਡੇਟਾ ਕਿਵੇਂ ਪ੍ਰਾਪਤ ਕਰੀਏ:** ਕੀ ਤੁਹਾਡੇ ਕੋਲ ਸਮਾਰਟ IoT ਮਿੱਟੀ ਸੈਂਸਰ ਨਹੀਂ ਹੈ? ਕੋਈ ਗੱਲ ਨਹੀਂ! ਤੁਸੀਂ ਆਪਣੇ ਸਰਕਾਰ ਦੁਆਰਾ ਜਾਰੀ **ਸੋਇਲ ਹੈਲਥ ਕਾਰਡ (Soil Health Card)** 'ਤੇ ਛਾਪੇ ਗਏ ਸਹੀ ਨਾਈਟ੍ਰੋਜਨ (N), ਫਾਸਫੋਰਸ (P), ਪੋਟਾਸ਼ੀਅਮ (K), ਅਤੇ pH ਮੁੱਲ ਲੱਭ ਸਕਦੇ ਹੋ। ਬੱਸ ਹੇਠਾਂ ਉਹ ਨੰਬਰ ਟਾਈਪ ਕਰੋ!",
        "desc": "ਆਪਣੀ ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਦੇ ਮਾਪਦੰਡ ਦਰਜ ਕਰੋ। ਸਾਡਾ ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਮਾਡਲ ਡੇਟਾ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੇਗਾ ਅਤੇ ਵੱਧ ਤੋਂ ਵੱਧ ਮੁਨਾਫੇ ਲਈ ਉਗਾਉਣ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਫਸਲ ਦੀ ਸਿਫਾਰਸ਼ ਕਰੇਗਾ।",
        "params": "### 📊 ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਦੇ ਮਾਪਦੰਡ",
        "n": "ਨਾਈਟ੍ਰੋਜਨ (N) ਦੀ ਮਾਤਰਾ",
        "p": "ਫਾਸਫੋਰਸ (P) ਦੀ ਮਾਤਰਾ",
        "k": "ਪੋਟਾਸ਼ੀਅਮ (K) ਦੀ ਮਾਤਰਾ",
        "temp": "ਔਸਤ ਤਾਪਮਾਨ (°C)",
        "hum": "ਔਸਤ ਨਮੀ (%)",
        "ph": "ਮਿੱਟੀ ਦਾ pH ਮੁੱਲ",
        "rain": "ਔਸਤ ਬਾਰਿਸ਼ (mm)",
        "btn": "🚀 AI ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਸਭ ਤੋਂ ਵਧੀਆ ਫਸਲ ਲੱਭੋ",
        "loading": "ਲੱਖਾਂ ਡੇਟਾ ਬਿੰਦੂਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ... ਮਿੱਟੀ ਦੀ ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ...",
        "result_title": "ਤੁਹਾਡੇ ਖੇਤ ਲਈ ਬਹੁਤ ਹੀ ਸਿਫਾਰਸ਼ ਕੀਤੀ ਫਸਲ ਹੈ:",
        "result_msg": "ਆਪਣੀ ਮੌਜੂਦਾ ਮਿੱਟੀ ਦੇ ਨਾਲ ਇਸ ਫਸਲ ਨੂੰ ਲਗਾਉਣ ਨਾਲ ਤੁਹਾਡੀ ਪੈਦਾਵਾਰ ਅਤੇ ਵਿੱਤੀ ਵਾਧਾ ਵੱਧ ਤੋਂ ਵੱਧ ਹੋਵੇਗਾ!",
        "water": "💧 <strong>ਪਾਣੀ ਦੀ ਲੋੜ:</strong>",
        "pest": "🛡️ <strong>ਸਿਫਾਰਸ਼ ਕੀਤੇ ਕੀਟਨਾਸ਼ਕ:</strong>",
        "tip": "💡 <strong>ਪ੍ਰੋ ਸੁਝਾਅ:</strong>"
    }
}

# Language Selector
lang = st.selectbox("🌐 Select Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ", ["English", "Hindi (हिंदी)", "Punjabi (ਪੰਜਾਬੀ)"])
t = TRANSLATIONS[lang]

# Load the trained model safely
@st.cache_resource
def load_model():
    try:
        with open('crop_model.pkl', 'rb') as f:
            return pickle.load(f)
    except FileNotFoundError:
        st.error("Model file not found. Please run generate_and_train.py first!")
        return None

model = load_model()

# Crop Specific Guidelines Dictionary (Always English for internal logic, translates via tips)
CROP_INFO = {
    'rice': {
        'water': 'High (Requires flooded fields or 1500-2500 mm rainfall)',
        'pesticides': 'Neem oil for early pests; Tricyclazole for blast disease.',
        'tips': 'Ensure proper soil puddling and maintain a thin layer of water.'
    },
    'apple': {
        'water': 'Moderate (100-125 mm evenly distributed)',
        'pesticides': 'Captan or Mancozeb for scab; use dormant oils for mites.',
        'tips': 'Requires cold hours (chilling) in winter for proper blooming.'
    },
    'cotton': {
        'water': 'Moderate (Requires well-distributed rainfall, sensitive to waterlogging)',
        'pesticides': 'Imidacloprid for sucking pests; Spinosad for bollworms.',
        'tips': 'Requires plenty of sunshine and dry weather during boll ripening.'
    },
    'coffee': {
        'water': 'Moderate to High (1500-2000 mm rainfall)',
        'pesticides': 'Bordeaux mixture for leaf rust; proper shade management reduces pests.',
        'tips': 'Grow under partial shade; requires well-drained loamy soil.'
    },
    'maize': {
        'water': 'Moderate (500-800 mm rainfall)',
        'pesticides': 'Emamectin benzoate for fall armyworm.',
        'tips': 'Requires good drainage; avoid water stagnation at all costs.'
    },
    'banana': {
        'water': 'High (Constant moisture needed, 1500-2500 mm)',
        'pesticides': 'Propiconazole for Sigatoka leaf spot.',
        'tips': 'Needs heavy feeding; apply nitrogen and potassium rich fertilizers frequently.'
    },
    'default': {
        'water': 'Moderate (Depends on soil moisture evaporation)',
        'pesticides': 'Use organic neem-based pesticides first; consult local agri-experts for chemicals.',
        'tips': 'Ensure proper crop rotation and regular soil nutrient testing to maintain yield.'
    }
}

# Header
st.markdown(f"<h1>{t['title']}</h1>", unsafe_allow_html=True)
st.markdown(f"<p style='text-align:center; color:#e0e0e0; font-size:20px; font-weight:bold;'>{t['subtitle']}</p>", unsafe_allow_html=True)
st.write("---")

# The Real-World Info Box
st.info(t['info'])

st.write(t['desc'])

# Input Form
st.markdown(t['params'])
col1, col2 = st.columns(2)

with col1:
    n = st.number_input(t['n'], min_value=0.0, max_value=150.0, value=90.0)
    k = st.number_input(t['k'], min_value=0.0, max_value=210.0, value=40.0)
    humidity = st.number_input(t['hum'], min_value=0.0, max_value=100.0, value=82.0)
    rainfall = st.number_input(t['rain'], min_value=0.0, max_value=300.0, value=200.0)

with col2:
    p = st.number_input(t['p'], min_value=0.0, max_value=150.0, value=42.0)
    temperature = st.number_input(t['temp'], min_value=0.0, max_value=50.0, value=25.0)
    ph = st.number_input(t['ph'], min_value=0.0, max_value=14.0, value=6.5)


st.write("") # spacing
if st.button(t['btn'], use_container_width=True):
    if model:
        # Cool loading animation
        with st.spinner(t['loading']):
            time.sleep(2) # Artificial delay for effect
            
        # Prepare input data
        input_data = np.array([[n, p, k, temperature, humidity, ph, rainfall]])
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        
        # Trigger Celebration!
        st.balloons()
        
        # Get crop specific advice
        info = CROP_INFO.get(prediction, CROP_INFO['default'])
        
        # Display result in a beautiful glassmorphism box
        st.markdown(f"""
        <div class="result-box">
            <h3 style="color: white; font-weight: normal;">{t['result_title']}</h3>
            <div class="crop-name">✨ {prediction} ✨</div>
            <p style="margin-top:15px; color:#ffffff; font-weight: bold;">{t['result_msg']}</p>
            <hr style="border-top: 1px solid rgba(255,255,255,0.4); margin: 20px 0;">
            <div style="text-align: left; font-size: 16px; line-height: 1.8; color: white;">
                <p>{t['water']} {info['water']}</p>
                <p>{t['pest']} {info['pesticides']}</p>
                <p>{t['tip']} {info['tips']}</p>
            </div>
        </div>
        """, unsafe_allow_html=True)
