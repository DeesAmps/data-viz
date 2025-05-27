import os
import pandas as pd
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and cache the CSV data on startup
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'owid-covid-data.csv')
data_df = pd.read_csv(DATA_PATH)

@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

@app.route('/api/countries')
def get_countries():
    countries = data_df['location'].dropna().unique().tolist()
    return jsonify({'countries': countries})

@app.route('/api/data')
def get_data():
    country = request.args.get('country')
    metric = request.args.get('metric', 'new_cases')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    df = data_df.copy()
    if country:
        df = df[df['location'] == country]
    if start_date:
        df = df[df['date'] >= start_date]
    if end_date:
        df = df[df['date'] <= end_date]
    result = df[['date', 'location', metric]].to_dict(orient='records')
    return jsonify(result)

@app.route('/api/export')
def export_data():
    country = request.args.get('country')
    metric = request.args.get('metric', 'new_cases')
    filetype = request.args.get('filetype', 'csv')
    df = data_df.copy()
    if country:
        df = df[df['location'] == country]
    output = BytesIO()
    if filetype == 'xlsx':
        df.to_excel(output, index=False)
        output.seek(0)
        return send_file(output, download_name='export.xlsx', as_attachment=True)
    else:
        df.to_csv(output, index=False)
        output.seek(0)
        return send_file(output, download_name='export.csv', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
