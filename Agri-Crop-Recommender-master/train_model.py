import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import pickle

print("Training model...")

crops = ['rice', 'maize', 'chickpea', 'kidneybeans']

data = []
for crop in crops:
    for _ in range(100):
        n = np.random.uniform(0, 140)
        p = np.random.uniform(5, 145)
        k = np.random.uniform(5, 205)
        temp = np.random.uniform(8, 45)
        hum = np.random.uniform(14, 100)
        ph = np.random.uniform(3.5, 9.9)
        rain = np.random.uniform(20, 300)
        data.append([n, p, k, temp, hum, ph, rain, crop])

df = pd.DataFrame(data, columns=['N','P','K','temperature','humidity','ph','rainfall','label'])

X = df[['N','P','K','temperature','humidity','ph','rainfall']]
y = df['label']

model = RandomForestClassifier()
model.fit(X, y)

with open("crop_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved as crop_model.pkl")