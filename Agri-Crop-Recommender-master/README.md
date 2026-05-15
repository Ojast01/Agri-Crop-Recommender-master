#  AgriVision AI: Intelligent Crop Recommendation Engine

##  Project Overview
AgriVision AI is an end-to-end Machine Learning web application designed to solve major agricultural challenges. It empowers farmers by analyzing soil and weather conditions to recommend the most profitable crop, significantly improving harvest yields and reducing financial risk.

##  Key Features
- **Smart Crop Prediction:** Uses a highly accurate `RandomForestClassifier` trained on extensive soil metrics (Nitrogen, Phosphorous, Potassium, pH) and environmental factors (Temperature, Humidity, Rainfall).
- **Multilingual Support:** Fully accessible UI featuring English, **Hindi (हिंदी)**, and **Punjabi (ਪੰਜਾਬੀ)** translations to serve local farming communities.
- **Actionable Agronomy Insights:** Goes beyond prediction by providing specific Water Requirements, Recommended Pesticides, and Pro-Tips for the suggested crop.
- **Modern UI/UX:** Built with Streamlit and styled with a custom Glassmorphism CSS aesthetic over a beautiful agricultural backdrop.

## Technology Stack
- **Machine Learning:** `scikit-learn`, `pandas`, `numpy` (Random Forest, Synthetic Data Generation)
- **Frontend & Deployment:** `streamlit` (Python)
- **Styling:** Custom CSS (Glassmorphism, Animations)

##  How to Run Locally
1. Clone this repository.
2. Install dependencies: `pip install -r requirements.txt`
3. Generate the dataset and train the model: `python generate_and_train.py`
4. Launch the application: `streamlit run app.py`

---
### 👨‍💻 Developed by [Ojas tyagi](https://github.com/Ojast01)
* Building Projects that Solve Real Problems*
