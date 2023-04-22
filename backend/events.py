
from webapp import db
from datetime import datetime
from bson import ObjectId
while True:
    plans = list(db.plans.find({
        'endDate': {
            '$lte': datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        },
        'status': '1'
    }))
    has_un_completed_tasks = False
    print(f'Plans founds {len(plans)}')
    for plan in plans:
        project = db.projects.find_one(
            {'_id': ObjectId(plan['project'])}, {'tasks': 1, 'columns': 1})
        un_completed_tasks = [
            i for k, v in project['tasks'].items() if k != 'done' for i in v]
        if (len(un_completed_tasks) > 0):
            print(f"Uncompleted tasks founds {(un_completed_tasks)}")
            db.tasks.update_many({'_id': {'$in': un_completed_tasks}}, {
                '$set': {
                    'plan': 'backLog',
                    'new': True}
            })
            has_un_completed_tasks = True
        db.plans.update_one({'_id': plan['_id']}, {
            '$set': {'status': "3", 'tasks': project['tasks'],
                     'columns': project['columns']}})
        for k, v in project['tasks'].items():
            project['tasks'][k] = []

        db.projects.update_one({'_id': plan['project']}, {
            '$set': {'tasks': project['tasks']}
        })
        print(
            f"Plan {plan['_id']} updated {'Uncompleted tasks added to backlog' if has_un_completed_tasks else ''}")
