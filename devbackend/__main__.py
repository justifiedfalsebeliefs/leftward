import os
from flask import Flask, request, jsonify
import config
import mysql.connector
import queries

app = Flask(__name__)


class APIReceiver:
    def __init__(self, request_args):
        self.authorization = False
        if config.api_key == request_args.get('apikey'):
            self.authorization = True

    def __enter__(self):
        self.conn = mysql.connector.connect(
            host=config.mysql_host,
            user=config.mysql_user,
            password=config.mysql_password,
            database=config.mysql_db
        )
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, etype, value, traceback):
        self.conn.close()

    def query_results(self, query):
        self.cursor.execute(query)
        records = self.cursor.fetchall()
        columns = self.cursor.column_names
        objects = [dict(zip(columns, record)) for record in records]
        return objects

    def push_record(self, query):
        self.cursor.execute(query)
        self.conn.commit()
        return


def get_response(request_args, query, return_as_records=False):
    with APIReceiver(request_args) as api_manager:
        if not api_manager.authorization:
            return jsonify({'resp': 'UNAUTHORIZED'}), 401
        objects = api_manager.query_results(query)
        if return_as_records:
            return objects
        return jsonify(objects), 200


def push_record(request_args, query, return_as_records=False):
    with APIReceiver(request_args) as api_manager:
        if not api_manager.authorization:
            return jsonify({'resp': 'UNAUTHORIZED'}), 401
        api_manager.push_record(query)
        if return_as_records:
            return True
        return jsonify({'resp': 'Success'}), 200


@app.route('/fetchDashboardListings', methods=['POST'])
def fetch_dashboard_listings():
    return get_response(request.args, queries.listActionsDashboard(request.args['userGuid']))


@app.route('/fetchHiddenActions', methods=['POST'])
def fetch_hidden_actions():
    return get_response(request.args, queries.fetchHiddenActions(request.args['userGuid']))


@app.route('/fetchMyActions', methods=['POST'])
def fetch_my_actions():
    return get_response(request.args, queries.fetchMyActions(request.args['userGuid']))


@app.route('/pushNewUserGuid', methods=['POST'])
def push_new_user_guid():
    return push_record(request.args, queries.pushNewUserGuid(request.args['newGuid']))


@app.route('/pushActionStatus', methods=['POST'])
def push_action_status():
    try:
        user_guid = request.args.get('userGuid')
        status = request.args.get('statusUpdate')
        actionId = request.args.get('actionId')
        objects = get_response(request.args, queries.getUserActions(user_guid), return_as_records=True)
        delete_id = []

        if status == 'INPROGRESS':
            for record in objects:
                if record['status'] == 'HIDDEN' and str(record['actionId']) == str(actionId):
                    print(delete_id)
                    delete_id.append(record['userActionId'])

        if status == 'COMPLETE' or 'HIDDEN':
            for record in objects:
                if record['status'] == 'INPROGRESS' and str(record['actionId']) == str(actionId):
                    delete_id.append(record['userActionId'])
        for id in delete_id:
            push_record(request.args, queries.deleteUserAction(id), return_as_records=True)
        return push_record(request.args, queries.pushActionStatus(user_guid, status, actionId))
    except Exception as e:
        return jsonify({'resp':f"An Error Occured"}), 500


port = int(os.environ.get('PORT', 8080))
app.debug = True
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)