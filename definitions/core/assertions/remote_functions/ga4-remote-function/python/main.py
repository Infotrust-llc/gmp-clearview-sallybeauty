from flask import Flask, request, jsonify
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import RunReportRequest, DateRange, Metric, Dimension
from google.oauth2 import service_account
import os, argparse, json

app = Flask(__name__)

# Load credentials (assuming they're stored as env variable or secret)
KEY_PATH =  "sallybeauty-us-ga4.json"               
PROPERTY_ID = "320983557"  

credentials = service_account.Credentials.from_service_account_file(KEY_PATH)
client = BetaAnalyticsDataClient(credentials=credentials)
AUTH_FILE_PATH = "sallybeauty-us-ga4.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]=AUTH_FILE_PATH

@app.route("/ga4", methods=["POST"])
def ga4_report(request=request):
    try:
        # req_data = request.get_json()
        # req_data = request.json

        req_data = json.loads(request.data.decode('utf-8').replace("'", '"'))
        req_data = req_data.get("calls")[0][0]   # need to figure out ore gracegul way to reqtieve request data

        print('request:', req_data)

        date_range = req_data.get("dateRange", {"start_date": "2025-07-01", "end_date": "2025-07-01"})
        metrics = req_data.get("metrics", ["sessions", "engagedSessions", "totalUsers", "activeUsers"])
        dimensions = req_data.get("dimensions", ["date"])


        # date_range = {"start_date": "2025-07-01", "end_date": "2025-07-02"}
        # metrics = ["sessions", "engagedSessions", "totalUsers", "activeUsers"]
        # dimensions =  ["date"]

        report = client.run_report(
            RunReportRequest(
                property=f"properties/{PROPERTY_ID}",
                dimensions=[Dimension(name=d) for d in dimensions],
                metrics=[Metric(name=m) for m in metrics],
                date_ranges=[DateRange(**date_range)]
            )
        )

        # print("GA4 Report for Yesterday:")
        # for row in response.rows:
        #     metrics = [metric.value for metric in row.metric_values]
        #     print(f"Total Users: {metrics[0]}, Engaged Sessions: {metrics[1]}")
        #
        rows = [
        # rows = { "replies":
            {
                dim.name: row.dimension_values[i].value
                for i, dim in enumerate(report.dimension_headers)
            } | {
                met.name: row.metric_values[i].value
                for i, met in enumerate(report.metric_headers)
            }
            for row in report.rows
        # }
        ]
        #
        print("attempting to jsonify...")
        print({"replies": [rows]})
        # return jsonify({"replies": rows})
        return json.dumps({"replies": rows})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":

    app.run(debug=False, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))


