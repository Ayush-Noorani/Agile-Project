# each folder has an Readme related to that folder

# start project

# frontend

cd my-app
npm install
npm start

# backend

# create virtual environment

cd backend
python3 -m venv .venv
.venv/Scripts/Activate.ps1
pip3 install -r requirements.txt
python app.py

# git instructions

Whenever master is updated
do
git checkout master
git pull
git checkout <your branch>
git rebase master

# docker logs gets last 20 records

sudo docker logs -f --tail 20 databas
