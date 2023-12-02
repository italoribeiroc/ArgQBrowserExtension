PYTHON := python
MAIN := app.main

env:
	powershell.exe -Command ".\argq\Scripts\Activate.ps1"

install:
	cd ./app && $(PYTHON) -m pip install -r requirements.txt

run:
	uvicorn $(MAIN):app --reload

test:
	$(PYTHON) -m pytest -vs

clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -delete

.PHONY: install run test clean
